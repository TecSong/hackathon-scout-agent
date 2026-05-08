import test from 'node:test';
import assert from 'node:assert/strict';
import { createAppServer } from '../src/server.js';

test('server exposes opportunities, submission kit, and cloud run manifest endpoints', async () => {
  const server = createAppServer();
  await new Promise(resolve => server.listen(0, resolve));
  const { port } = server.address();
  try {
    const base = `http://127.0.0.1:${port}`;
    const opportunities = await fetch(`${base}/api/opportunities`).then(r => r.json());
    assert.ok(opportunities.length >= 4);
    const kit = await fetch(`${base}/api/submission-kit`).then(r => r.json());
    assert.equal(kit.projectTitle, 'Hackathon Scout Agent');
    const manifest = await fetch(`${base}/api/cloud-run`).then(r => r.json());
    assert.match(manifest.commands.deploy, /gcloud run deploy/);
    const html = await fetch(base).then(r => r.text());
    assert.match(html, /Judge-ready submission kit/);
    assert.match(html, /Human approval boundary/);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
