import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

// An existing custom app has its own generated identity. Updating it must retain
// that identity and registered app binding, rather than adding another connector.
const [existingZip, outputZip] = process.argv.slice(2);
if (!existingZip || !outputZip)
  throw new Error('Usage: node scripts/package-personal-chatgpt.mjs <existing-plugin.zip> <output.zip>');
const here = dirname(fileURLToPath(import.meta.url));
const source = [resolve(here, '../chatgpt'), resolve(here, '../../chatgpt')]
  .find((path) => existsSync(resolve(path, 'plugin.json')));
if (!source) throw new Error('Run from the Clypmint agent-plugin package');
const input = resolve(existingZip);
const output = resolve(outputZip);
if (input === output || existsSync(output)) throw new Error('Choose a new output ZIP path');
const list = execFileSync('unzip', ['-Z1', input], { encoding: 'utf8', maxBuffer: 1024 * 1024 })
  .trim().split('\n');
function jsonEntry(name) {
  if (list.filter((entry) => entry === name).length !== 1)
    throw new Error(`Expected exactly one ${name} in the downloaded plugin ZIP`);
  return JSON.parse(execFileSync('unzip', ['-p', input, name], {
    encoding: 'utf8', maxBuffer: 256 * 1024,
  }));
}
const original = jsonEntry(list.includes('plugin.json') ? 'plugin.json' : '.codex-plugin/plugin.json');
const binding = jsonEntry('.app.json');
if (!/^[a-zA-Z0-9_-]{1,64}$/.test(original.name ?? '')) throw new Error('Invalid existing plugin identity');
const apps = Object.entries(binding.apps ?? {});
if (apps.length !== 1 || !/^asdk_app_[a-zA-Z0-9]+$/.test(apps[0][1]?.id ?? ''))
  throw new Error('Expected one existing registered app binding');
const plugin = JSON.parse(readFileSync(resolve(source, 'plugin.json'), 'utf8'));
plugin.name = original.name;
const extension = plugin.extensions['com.openai'];
extension.apps = './.app.json';
// Public-review fixtures refer to the separately registered submission server.
// This personal package uses the user's already installed development app.
delete extension.review;
delete extension.publication;
mkdirSync(dirname(output), { recursive: true });
const staging = mkdtempSync(resolve(tmpdir(), 'clypmint-personal-plugin-'));
try {
  for (const name of ['skills', 'assets']) cpSync(resolve(source, name), resolve(staging, name), { recursive: true });
  writeFileSync(resolve(staging, 'plugin.json'), JSON.stringify(plugin, null, 2) + '\n');
  writeFileSync(resolve(staging, '.app.json'), JSON.stringify(binding, null, 2) + '\n');
  execFileSync('zip', ['-q', '-r', output, '.'], { cwd: staging });
  console.log(`PASS personal ChatGPT update: ${output}`);
} finally {
  rmSync(staging, { recursive: true, force: true });
}
