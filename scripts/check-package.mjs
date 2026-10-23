import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const json = (path) => JSON.parse(read(path));
const openai = json('chatgpt/plugin.json');
const codex = json('plugins/clypmint-codex/plugin.json');
const claude = json('plugins/clypmint/.claude-plugin/plugin.json');
assert.equal(openai.version, codex.version);
assert.equal(openai.version, claude.version);
assert.equal(claude.repository, 'https://github.com/nuttallp/agent-plugin');
assert.equal(claude.privacyPolicyUrl, 'https://clypmint.com/legal/privacy');
assert.ok(existsSync(resolve(root, 'plugins/clypmint', claude.icon)));
for (const file of readdirSync(resolve(root, 'plugins/clypmint/skills'), { recursive: true }))
  assert.ok(!String(file).includes('.test.'), 'Test fixtures must not ship in the plugin');
assert.equal(codex.extensions['com.openai'].review, undefined);
for (const [base, main] of [
  ['chatgpt', 'edit-video'],
  ['plugins/clypmint-codex', 'edit-video'],
  ['plugins/clypmint', 'clypmint-video-editing'],
]) {
  const names = readdirSync(resolve(root, base, 'skills')).sort();
  assert.deepEqual(
    names,
    ['ad-with-three-hooks', 'clip-podcast-into-shorts', main, 'month-of-faceless-posts'].sort(),
  );
  for (const name of names) {
    const canonicalName = name === 'clypmint-video-editing' ? 'edit-video' : name;
    const canonical = `chatgpt/skills/${canonicalName}`;
    const target = `${base}/skills/${name}`;
    for (const entry of readdirSync(resolve(root, canonical), {
      recursive: true,
      withFileTypes: true,
    }).filter((x) => x.isFile())) {
      const path = `${entry.parentPath}/${entry.name}`.slice(resolve(root, canonical).length + 1);
      const expected = read(`${canonical}/${path}`);
      const actual = read(`${target}/${path}`).replace(
        'name: clypmint-video-editing',
        'name: edit-video',
      );
      assert.equal(actual, expected, `${target}/${path} drift`);
    }
    const metadata = read(`${target}/agents/openai.yaml`);
    assert.ok(metadata.includes('allow_implicit_invocation: true'));
    assert.ok(metadata.includes('https://clypmint.com/mcp'));
  }
}
for (const item of json('.agents/plugins/marketplace.json').plugins)
  assert.ok(existsSync(resolve(root, item.source.path, 'plugin.json')));
for (const item of json('.claude-plugin/marketplace.json').plugins)
  assert.ok(existsSync(resolve(root, item.source, '.claude-plugin/plugin.json')));
for (const path of [
  'chatgpt/mcp.json',
  'plugins/clypmint-codex/mcp.json',
  'plugins/clypmint/.mcp.json',
])
  assert.equal(json(path).mcpServers.clypmint.url, 'https://clypmint.com/mcp');
console.log(
  `PASS v${openai.version}: all four skills, dependencies, resources and marketplace paths agree across hosts.`,
);

// The directory edition is intentionally independent of the full-generation package.
const editing = json('plugins/clypmint-editing/.claude-plugin/plugin.json');
assert.equal(editing.name, 'clypmint-editing');
assert.equal(json('plugins/clypmint-editing/.mcp.json').mcpServers['clypmint-editing'].url, 'https://clypmint.com/mcp/claude-editing');
assert.deepEqual(readdirSync(resolve(root, 'plugins/clypmint-editing/skills')).sort(), ['correct-video-captions','edit-existing-video','reframe-existing-video']);
for (const file of readdirSync(resolve(root, 'plugins/clypmint-editing'), {recursive:true}))
  assert.ok(!/\.(?:mjs|js|py|sh|ts)$/u.test(String(file)), 'Editing edition has no executable scripts');
console.log('PASS restricted Claude editing package and three static skills.');
