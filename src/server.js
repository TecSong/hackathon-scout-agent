import http from 'node:http';
import fs from 'node:fs/promises';
import { runAgent } from './agent.js';

const PORT = process.env.PORT || 8787;

function page(items) {
  const rows = items.map(x => `<tr><td><b>${x.priority}</b><br/>${x.score}</td><td><a href="${x.url}">${x.title}</a><br/><small>${x.platform} · ${x.type}</small></td><td>${x.deadline}<br/><b>${x.reward}</b></td><td>${x.actionPlan.slice(0,3).map(s=>`<li>${s}</li>`).join('')}</td></tr>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Hackathon Scout Agent</title><style>body{font-family:Inter,system-ui,sans-serif;margin:0;background:#0b1020;color:#eef2ff}.hero{padding:48px;background:linear-gradient(135deg,#2563eb,#7c3aed)}main{padding:28px}table{width:100%;border-collapse:collapse;background:#111827;border-radius:16px;overflow:hidden}td,th{padding:16px;border-bottom:1px solid #263244;vertical-align:top}a{color:#93c5fd}.pill{display:inline-block;padding:6px 10px;background:#10b981;border-radius:999px;color:#04120d;font-weight:700}</style></head><body><section class="hero"><span class="pill">Gemini-ready Google Cloud Agent Builder concept</span><h1>Hackathon Scout Agent</h1><p>Monitors AI/Web3 hackathons and bounties, ranks ROI, prepares application packets, and keeps humans in control for final submission.</p></section><main><h2>Opportunity Queue</h2><table><tr><th>Priority</th><th>Opportunity</th><th>Deadline / Reward</th><th>Next Actions</th></tr>${rows}</table><h2>Agent workflow</h2><ol><li>Collect from Devpost, DoraHacks, Superteam, Kaggle and other sources.</li><li>Use Gemini reasoning to score fit, reward, deadline risk and build effort.</li><li>Generate application packet, repo checklist, demo-video script and submission form copy.</li><li>Human approves registration/submission to avoid unauthorized account or wallet actions.</li></ol></main></body></html>`;
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === '/api/opportunities') {
      const items = await runAgent();
      res.writeHead(200, { 'content-type': 'application/json' });
      return res.end(JSON.stringify(items, null, 2));
    }
    const items = await runAgent();
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(page(items));
  } catch (err) {
    res.writeHead(500, { 'content-type': 'text/plain' });
    res.end(err.stack || String(err));
  }
});

server.listen(PORT, () => console.log(`Hackathon Scout Agent running on http://localhost:${PORT}`));
