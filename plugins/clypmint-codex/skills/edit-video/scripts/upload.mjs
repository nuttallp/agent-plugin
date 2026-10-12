#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { createReadStream, promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MIB = 1024 * 1024;
const MIN_PART_BYTES = 8 * MIB;
const MAX_PART_BYTES = 64 * MIB;
const TARGET_PARTS = 256;
const PRESIGN_WINDOW = 64;
const PART_RETRIES = 3;
const API_ORIGIN = 'https://clypmint.com';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function multipartPlan(size) {
  const safeSize = Math.max(1, Number(size) || 1);
  const targetPartBytes = Math.ceil(safeSize / TARGET_PARTS / MIB) * MIB;
  const partSizeBytes = clamp(targetPartBytes, MIN_PART_BYTES, MAX_PART_BYTES);
  return { partSizeBytes, partCount: Math.max(1, Math.ceil(safeSize / partSizeBytes)) };
}

function handoffToken(uploadLink) {
  let link;
  try {
    link = new URL(uploadLink);
  } catch {
    throw new Error('The upload link is not valid.');
  }
  if (link.protocol !== 'https:' || link.hostname !== 'clypmint.com') {
    throw new Error('The upload link must be a Clypmint link.');
  }
  const token = link.hash.slice(1);
  if (!/^hof_[A-Za-z0-9_-]+$/u.test(token)) {
    throw new Error('The upload link is missing its private upload code.');
  }
  return token;
}

function contentType(filename) {
  const extension = path.extname(filename).toLowerCase();
  return (
    {
      '.mp4': 'video/mp4',
      '.mov': 'video/quicktime',
      '.m4v': 'video/x-m4v',
      '.webm': 'video/webm',
      '.avi': 'video/x-msvideo',
      '.mkv': 'video/x-matroska',
    }[extension] || 'application/octet-stream'
  );
}

async function sha256(file) {
  const hash = createHash('sha256');
  for await (const chunk of createReadStream(file)) hash.update(chunk);
  return hash.digest('hex');
}

function requestHeaders(token, json = false) {
  return {
    Authorization: `Bearer ${token}`,
    ...(json ? { 'Content-Type': 'application/json' } : {}),
  };
}

async function responseJson(response, stage) {
  if (!response.ok) throw new Error(`${stage} request failed (${response.status}).`);
  try {
    return await response.json();
  } catch {
    throw new Error(`${stage} response was not valid JSON.`);
  }
}

function partBody(file, start, end) {
  return createReadStream(file, { start, end: end - 1 });
}

function progressLine(write, complete, total) {
  const percent = Math.floor((complete / total) * 100);
  write(`\rUploading ${percent}% (${complete}/${total} parts)`);
}

async function putPart({
  fetchImpl,
  file,
  size,
  getTarget,
  refreshTarget,
  token,
  partNumber,
  partSizeBytes,
}) {
  const start = (partNumber - 1) * partSizeBytes;
  const end = Math.min(start + partSizeBytes, size);
  for (let retry = 0; retry <= PART_RETRIES; retry += 1) {
    try {
      const target = getTarget(partNumber);
      if (!target?.url) throw new Error(`The upload service did not provide part ${partNumber}.`);
      const response = await fetchImpl(target.url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/octet-stream',
          ...(target.transport === 'api' ? requestHeaders(token) : {}),
        },
        body: partBody(file, start, end),
        duplex: 'half',
      });
      if (!response.ok) {
        if (response.status === 403) await refreshTarget(partNumber);
        throw new Error(`part ${partNumber} upload failed (${response.status}).`);
      }
      const etag = response.headers.get('etag') || response.headers.get('ETag');
      if (!etag) throw new Error(`part ${partNumber} upload returned no ETag.`);
      return etag;
    } catch (error) {
      if (retry === PART_RETRIES) throw error;
      await new Promise((resolve) => setTimeout(resolve, 250 * (retry + 1)));
    }
  }
  throw new Error(`part ${partNumber} upload failed.`);
}

/**
 * Upload one local file with the same staged multipart protocol used by /send.
 * `fetchImpl`, `write`, and `partSizeBytes` make the protocol testable; the CLI
 * always uses the browser-matching multipart plan and Node's global fetch.
 */
export async function uploadVideo({
  file,
  uploadLink,
  fetchImpl = fetch,
  write = (line) => process.stderr.write(line),
  partSizeBytes,
} = {}) {
  const token = handoffToken(uploadLink);
  const stat = await fs.stat(file);
  if (!stat.isFile() || stat.size < 1) throw new Error('Choose a non-empty video file.');

  const defaultPlan = multipartPlan(stat.size);
  const partBytes = partSizeBytes ?? defaultPlan.partSizeBytes;
  const partCount = Math.ceil(stat.size / partBytes);
  const filename = path.basename(file);
  const start = await responseJson(
    await fetchImpl(`${API_ORIGIN}/api/studio/upload/start`, {
      method: 'POST',
      headers: requestHeaders(token, true),
      body: JSON.stringify({
        filename,
        mime: contentType(filename),
        size: stat.size,
        partCount,
      }),
    }),
    'start',
  );
  if (!start?.key || !start?.uploadId || !Array.isArray(start.partUrls)) {
    throw new Error('The upload service returned an incomplete upload plan.');
  }

  const targets = new Map(
    start.partUrls.map((part) => [
      part.partNumber,
      { url: part.url, transport: part.transport ?? 'api' },
    ]),
  );
  async function presignWindow(partNumber, refresh = false) {
    if (refresh) targets.delete(partNumber);
    const partNumbers = [];
    for (
      let current = partNumber;
      current <= partCount && partNumbers.length < PRESIGN_WINDOW;
      current += 1
    ) {
      if (!targets.has(current)) partNumbers.push(current);
    }
    if (!partNumbers.length) return;
    const result = await responseJson(
      await fetchImpl(`${API_ORIGIN}/api/studio/upload/presign-parts`, {
        method: 'POST',
        headers: requestHeaders(token, true),
        body: JSON.stringify({ key: start.key, partNumbers }),
      }),
      'presign',
    );
    if (!Array.isArray(result?.partUrls))
      throw new Error('The upload service returned no part URLs.');
    for (const part of result.partUrls) {
      targets.set(part.partNumber, { url: part.url, transport: part.transport ?? 'api' });
    }
  }

  const parts = [];
  progressLine(write, 0, partCount);
  for (let partNumber = 1; partNumber <= partCount; partNumber += 1) {
    if (!targets.has(partNumber)) await presignWindow(partNumber);
    const ETag = await putPart({
      fetchImpl,
      file,
      size: stat.size,
      getTarget: (number) => targets.get(number),
      refreshTarget: (number) => presignWindow(number, true),
      token,
      partNumber,
      partSizeBytes: partBytes,
    });
    parts.push({ PartNumber: partNumber, ETag });
    progressLine(write, partNumber, partCount);
  }
  write('\n');

  const completed = await responseJson(
    await fetchImpl(`${API_ORIGIN}/api/studio/upload/complete`, {
      method: 'POST',
      headers: requestHeaders(token, true),
      body: JSON.stringify({
        key: start.key,
        uploadId: start.uploadId,
        parts,
        sha256: await sha256(file),
      }),
    }),
    'complete',
  );

  // The handoff starts the edit as soon as the source is durable. It is safe
  // to ignore a missing endpoint during a rolling deployment: the handoff is
  // still picked up by the normal upload path.
  try {
    await fetchImpl(`${API_ORIGIN}/api/mcp/handoff-landed`, {
      method: 'POST',
      headers: requestHeaders(token),
    });
  } catch {
    // Best effort only.
  }
  return completed;
}

function safeMessage(error) {
  const message = error instanceof Error ? error.message : 'Upload failed.';
  return message.replace(/hof_[A-Za-z0-9_-]+/gu, '[private upload code]');
}

async function main() {
  const [file, uploadLink] = process.argv.slice(2);
  if (!file || !uploadLink) {
    process.stderr.write('Usage: node upload.mjs <video file> <upload link>\n');
    process.exitCode = 1;
    return;
  }
  try {
    await uploadVideo({ file, uploadLink });
    process.stdout.write('Upload complete. Clypmint is starting the edit.\n');
  } catch (error) {
    process.stderr.write(`Upload failed: ${safeMessage(error)}\n`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  void main();
}
