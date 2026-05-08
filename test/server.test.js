import test from 'node:test';
import assert from 'node:assert/strict';
import { createAppServer } from '../src/server.js';

test('server exposes opportunities and submission kit endpoints', async () => {
  const server = createAppServer();
  await new Promise(resolve => server.listen(0, resolve));
  const { port } = server.address();
  try {
    const base = `http://127.0.0.1:${port}`;
    const opportunities = await fetch(`${base}/api/opportunities`).then(r => r.json());
    assert.ok(opportunities.length >= 4);
    const kit = await fetch(`${base}/api/submission-kit`).then(r => r.json());
    assert.equal(kit.projectTitle, 'Hackathon Scout Agent');
    const html = await fetch(base).then(r => r.text());
    assert.match(html, /Submission kit/);
    assert.match(html, /Human approval boundary/);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
