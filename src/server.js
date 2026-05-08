import http from 'node:http';
import { runAgent } from './agent.js';

const PORT = process.env.PORT || 8787;

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
}

function selectPrimarySubmission(items) {
  return items[0];
}

function page(items) {
  const top = items[0];
  const primary = selectPrimarySubmission(items);
  const kit = primary?.submissionKit;
  const rows = items.map(x => `<tr>
    <td><b>${x.priority}</b><br/><span class="score">${x.score}</span></td>
    <td><a href="${escapeHtml(x.url)}">${escapeHtml(x.title)}</a><br/><small>${escapeHtml(x.platform)} · ${escapeHtml(x.type)} · ${escapeHtml(x.sourceMode || 'fallback')}</small></td>
    <td>${escapeHtml(x.deadline)}<br/><b>${escapeHtml(x.reward)}</b></td>
    <td>${x.actionPlan.slice(0,3).map(s=>`<li>${escapeHtml(s)}</li>`).join('')}</td>
    <td><small>${escapeHtml(x.evidence?.source)}<br/>${escapeHtml(x.evidence?.url)}</small></td>
  </tr>`).join('');
  const judging = kit?.judgingMap.map(x => `<li><b>${escapeHtml(x.criterion)}:</b> ${escapeHtml(x.evidence)}</li>`).join('') || '';
  const approvals = kit?.humanApprovalRequired.map(x => `<li>${escapeHtml(x)}</li>`).join('') || '';
  return `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Hackathon Scout Agent</title><style>
    body{font-family:Inter,system-ui,sans-serif;margin:0;background:#08111f;color:#eef2ff}.hero{padding:56px;background:radial-gradient(circle at top left,#22c55e,transparent 32%),linear-gradient(135deg,#2563eb,#7c3aed)}main{padding:28px;max-width:1200px;margin:auto}table{width:100%;border-collapse:collapse;background:#111827;border-radius:16px;overflow:hidden}td,th{padding:16px;border-bottom:1px solid #263244;vertical-align:top}a{color:#93c5fd}.pill{display:inline-block;padding:6px 10px;background:#10b981;border-radius:999px;color:#04120d;font-weight:800}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}.card{background:#111827;border:1px solid #263244;border-radius:16px;padding:18px}.score{font-size:28px;color:#86efac;font-weight:900}code{background:#020617;padding:3px 6px;border-radius:6px}
  </style></head><body><section class="hero"><span class="pill">Opportunity-prep · Payout-aware · MCP-aware</span><h1>Hackathon Scout Agent</h1><p>Monitors AI/Web3 hackathons and bounties, ranks expected ROI, generates evidence-backed application packets, and keeps humans in control for sensitive submissions.</p></section><main>
  <section class="grid"><div class="card"><h2>Top recommendation</h2><h3>${escapeHtml(top?.title)}</h3><p><b>${top?.priority}</b> · score ${top?.score} · ${escapeHtml(top?.reward)}</p><p>${escapeHtml(top?.pitch)}</p></div><div class="card"><h2>Submission kit</h2><p>${escapeHtml(kit?.tagline)}</p><p><a href="/api/submission-kit">/api/submission-kit</a></p></div><div class="card"><h2>Human approval boundary</h2><ul>${approvals}</ul></div></section>
  <h2>Opportunity Queue</h2><table><tr><th>Priority</th><th>Opportunity</th><th>Deadline / Reward</th><th>Next Actions</th><th>Evidence</th></tr>${rows}</table>
  <section class="grid"><div class="card"><h2>Agent workflow</h2><ol><li>Collect public opportunities with live API first and curated fallback second.</li><li>Score fit, reward, deadline risk, online availability, payout compatibility, and build effort.</li><li>Generate packet, pitch, judging map, and demo/submission checklist.</li><li>Ask for human approval before registration, wallet, KYC, terms acceptance, or final submission.</li></ol></div><div class="card"><h2>Judging map</h2><ul>${judging}</ul></div><div class="card"><h2>Current focus</h2><p>Google Cloud Rapid Agent Hackathon has been dropped. Active drafts: BuyWhere and MeDo, plus future payout-compatible AI/Web3 bounties.</p></div></section>
  </main></body></html>`;
}

function json(res, payload) {
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify(payload, null, 2));
}

export function createAppServer() {
  return http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      if (url.pathname === '/api/opportunities') return json(res, await runAgent());
      if (url.pathname === '/api/submission-kit') {
        const items = await runAgent();
        return json(res, selectPrimarySubmission(items).submissionKit);
      }
      const items = await runAgent();
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      res.end(page(items));
    } catch (err) {
      res.writeHead(500, { 'content-type': 'text/plain' });
      res.end(err.stack || String(err));
    }
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  createAppServer().listen(PORT, () => console.log(`Hackathon Scout Agent running on http://localhost:${PORT}`));
}
