import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { multipartPlan, uploadVideo } from './upload.mjs';

test('uses the /send multipart protocol with bearer authentication', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'clypmint-upload-'));
  const file = path.join(directory, 'take.mp4');
  const bytes = Buffer.from('abcdef');
  await writeFile(file, bytes);
  const requests = [];
  const token = 'hof_private_test_token';
  const fetchImpl = async (url, init = {}) => {
    requests.push({ url, init });
    if (url.endsWith('/start')) {
      return Response.json({
        key: 'staged_1',
        uploadId: 'staged_1',
        partUrls: [{ partNumber: 1, url: 'https://upload.example/1', transport: 's3' }],
      });
    }
    if (url.endsWith('/presign-parts')) {
      return Response.json({
        partUrls: [{ partNumber: 2, url: 'https://upload.example/2', transport: 's3' }],
      });
    }
    if (url.startsWith('https://upload.example/')) {
      return new Response(null, { status: 200, headers: { ETag: `etag-${url.at(-1)}` } });
    }
    if (url.endsWith('/complete')) return Response.json({ videoId: 'video_1' });
    if (url.endsWith('/handoff-landed')) return new Response(null, { status: 404 });
    throw new Error('unexpected request');
  };

  try {
    const result = await uploadVideo({
      file,
      uploadLink: `https://clypmint.com/send#${token}`,
      fetchImpl,
      write: () => {},
      partSizeBytes: 3,
    });
    assert.deepEqual(result, { videoId: 'video_1' });
    assert.deepEqual(
      requests.map((request) => request.url),
      [
        'https://clypmint.com/api/studio/upload/start',
        'https://upload.example/1',
        'https://clypmint.com/api/studio/upload/presign-parts',
        'https://upload.example/2',
        'https://clypmint.com/api/studio/upload/complete',
        'https://clypmint.com/api/mcp/handoff-landed',
      ],
    );
    const [start, firstPart, presign, secondPart, complete, landed] = requests;
    assert.equal(start.init.headers.Authorization, `Bearer ${token}`);
    assert.equal(start.init.headers['Content-Type'], 'application/json');
    assert.deepEqual(JSON.parse(start.init.body), {
      filename: 'take.mp4',
      mime: 'video/mp4',
      size: 6,
      partCount: 2,
    });
    assert.equal(firstPart.init.headers.Authorization, undefined);
    assert.equal(firstPart.init.headers['Content-Type'], 'application/octet-stream');
    assert.equal(firstPart.init.duplex, 'half');
    assert.deepEqual(JSON.parse(presign.init.body), { key: 'staged_1', partNumbers: [2] });
    assert.equal(secondPart.init.headers.Authorization, undefined);
    assert.deepEqual(JSON.parse(complete.init.body), {
      key: 'staged_1',
      uploadId: 'staged_1',
      parts: [
        { PartNumber: 1, ETag: 'etag-1' },
        { PartNumber: 2, ETag: 'etag-2' },
      ],
      sha256: createHash('sha256').update(bytes).digest('hex'),
    });
    assert.equal(complete.init.headers.Authorization, `Bearer ${token}`);
    assert.equal(landed.init.headers.Authorization, `Bearer ${token}`);
    assert.equal(landed.init.body, undefined);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('uses the same multipart size plan as /send', () => {
  assert.deepEqual(multipartPlan(1), { partSizeBytes: 8 * 1024 * 1024, partCount: 1 });
  assert.deepEqual(multipartPlan(20 * 1024 * 1024), {
    partSizeBytes: 8 * 1024 * 1024,
    partCount: 3,
  });
});
