import fs from 'node:fs/promises';
import crypto from 'node:crypto';

const DEVPOST_API = 'https://devpost.com/api/hackathons?status[]=open&sort_by=Recently+Added';

const FALLBACK_SOURCES = [
  { platform: 'BuyWhere', sourceMode: 'curated-fallback', type: 'developer_challenge', title: 'Build With BuyWhere: AI Agent Developer Challenge', url: 'https://buywhere.ai/challenge/', deadline: '2026-05-19', reward: 'Apple M3 MacBook Air + API credits + swag', tags: ['AI', 'agent', 'commerce', 'MCP', 'API'], effort: 2, organizer: 'BuyWhere', isOnline: true },
  { platform: 'Devpost', sourceMode: 'curated-fallback', type: 'hackathon', title: 'Build with MeDo Hackathon', url: 'https://medo.devpost.com/', deadline: '2026-05-20 09:00 EDT', reward: '$50,000+ cash and other prizes', tags: ['AI', 'no-code', 'automation', 'MeDo'], effort: 3, organizer: 'Baidu / MeDo', isOnline: true },
  { platform: 'Superteam Earn', sourceMode: 'curated-fallback', type: 'bounty', title: 'Solana AI tooling bounty', url: 'https://earn.superteam.fun/', deadline: 'rolling', reward: 'varies', tags: ['web3', 'solana', 'bounty'], effort: 3, organizer: 'Superteam', isOnline: true },
  { platform: 'DoraHacks', sourceMode: 'curated-fallback', type: 'web3_hackathon', title: 'AI x Web3 BUIDL opportunities', url: 'https://dorahacks.io/hackathon', deadline: 'varies', reward: 'varies', tags: ['web3', 'crypto', 'buidl'], effort: 3, organizer: 'DoraHacks', isOnline: true }
];

function hash(input) { return crypto.createHash('sha256').update(input).digest('hex').slice(0, 12); }
function hasAny(text, words) { const t = text.toLowerCase(); return words.some(w => t.includes(w.toLowerCase())); }
function uniqByUrl(items) {
  const seen = new Set();
  return items.filter(item => {
    const key = String(item.url || `${item.platform}:${item.title}`).toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function normalizeDevpostHackathon(raw) {
  const title = raw.title || raw.name || 'Untitled Devpost hackathon';
  const url = raw.url || raw.website_url || raw.public_url || raw.link || 'https://devpost.com/hackathons';
  const themes = raw.themes || raw.tags || [];
  const tags = themes.map(x => typeof x === 'string' ? x : x.name).filter(Boolean);
  return {
    platform: 'Devpost',
    sourceMode: 'live-api',
    type: 'hackathon',
    title,
    url,
    deadline: raw.submission_period_dates || raw.deadline || raw.end_date || 'see official page',
    reward: raw.prize_amount || raw.prize || raw.prizes || 'see official page',
    tags,
    effort: hasAny(`${title} ${tags.join(' ')}`, ['agent', 'gemini', 'ai']) ? 3 : 4,
    organizer: raw.organization_name || raw.host || 'Devpost organizer',
    isOnline: !hasAny(`${raw.displayed_location?.location || raw.location || ''}`, ['in-person only']),
    evidence: { source: 'Devpost public API', url, fetchedAt: new Date().toISOString() }
  };
}

export async function fetchDevpostOpportunities({ fetchImpl = globalThis.fetch } = {}) {
  if (!fetchImpl) return [];
  try {
    const response = await fetchImpl(DEVPOST_API, { headers: { 'accept': 'application/json' } });
    if (!response.ok) return [];
    const data = await response.json();
    const rows = Array.isArray(data) ? data : (data.hackathons || data.results || []);
    return rows.map(normalizeDevpostHackathon);
  } catch {
    return [];
  }
}

export function rankOpportunity(item, profile = {}) {
  const target = `${item.title} ${item.platform} ${item.type} ${item.tags?.join(' ') || ''}`;
  let score = 0;
  if (hasAny(target, ['agent', 'gemini', 'llm', 'ai'])) score += 35;
  if (hasAny(target, ['google cloud', 'cloud run', 'agent builder', 'gemini'])) score += 12;
  if (hasAny(target, ['web3', 'crypto', 'solana', 'ethereum', 'bounty', 'mcp'])) score += 20;
  if (String(item.reward || '').match(/\$|usd|usdc|cash|prize/i)) score += 20;
  if (String(item.deadline || '').match(/rolling|2026-06|2026-05|open|see official/i)) score += 12;
  if (item.isOnline !== false) score += 6;
  score += Math.max(0, 18 - (item.effort || 3) * 3);
  if (profile.preferRemote !== false) score += 6;
  return Math.min(100, score);
}

export function makeActionPlan(item) {
  const repoSlug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 48);
  return [
    `Verify official rules, judging criteria, deadline, eligibility, and required assets for ${item.platform}.`,
    `Capture source evidence from ${item.url} and save deadline/prize notes.`,
    `Create or update public GitHub repo: ${repoSlug}.`,
    `Build a focused MVP aligned with sponsor APIs or platform-specific requirements.`,
    `Record a 3 minute demo: problem, live scout run, packet generation, Cloud architecture, impact.`,
    `Human reviews and submits hosted URL, GitHub URL, video URL, selected track, and concise project description.`
  ];
}

export function generateSubmissionKit(item) {
  const title = 'Hackathon Scout Agent';
  return {
    projectTitle: title,
    tagline: 'An agent that discovers high-value hackathons, ranks expected ROI, and generates human-approved submission packets.',
    shortDescription: 'Hackathon Scout Agent turns fragmented AI/Web3 opportunity discovery into a daily execution queue with scoring, evidence, application packets, payout checks, and safe human-in-the-loop submission boundaries.',
    architecture: 'The agent scores opportunity fit and generates submission copy; a local or generic web host serves the dashboard/API; scheduled monitors can trigger scans; a database can store opportunities/evidence; MCP integrations can track repo tasks or persistent opportunity metadata.',
    judgingMap: [
      { criterion: 'Impact', evidence: 'Helps solo builders convert skills into funded opportunities instead of missing deadlines across scattered platforms.' },
      { criterion: 'Technical execution', evidence: 'Runnable Node agent, API, dashboard, deterministic fallback, tests, and optional AI enhancement point.' },
      { criterion: 'Responsible automation', evidence: 'Registration, wallet, KYC, legal terms, and final submissions stay human-approved with explicit boundary text.' }
    ],
    humanApprovalRequired: ['platform registration', 'wallet signatures', 'KYC or legal terms', 'repo/public data exposure', 'final Devpost submission'],
    demoScript: [
      { time: '0:00-0:20', scene: 'Problem: opportunities are scattered and deadline-sensitive.' },
      { time: '0:20-0:50', scene: 'Run the scout and show ranked queue with evidence.' },
      { time: '0:50-1:40', scene: 'Open a P0 packet: scoring, pitch, next actions, deliverables, approval boundaries.' },
      { time: '1:40-2:20', scene: 'Show API output, opportunity evidence, payout filtering, and integration architecture.' },
      { time: '2:20-3:00', scene: 'Impact: repeatable pipeline for independent builders to find and ship funded work.' }
    ]
  };
}

export function buildApplicationPacket(item) {
  const score = rankOpportunity(item, { preferRemote: true });
  const packet = {
    id: hash(item.platform + item.title + item.url),
    score,
    priority: score >= 75 ? 'P0' : score >= 55 ? 'P1' : 'P2',
    ...item,
    evidence: item.evidence || { source: item.sourceMode || 'curated fallback', url: item.url, fetchedAt: new Date().toISOString() },
    pitch: `Hackathon Scout Agent turns opportunity discovery into action: it monitors AI/Web3 hackathons and bounties, ranks them by expected ROI, prepares application packets, and keeps the human in control for final submission.`,
    actionPlan: makeActionPlan(item),
    deliverables: ['public GitHub repo', 'hosted demo URL or local demo instructions', '~3 minute demo video if required', 'submission form draft', 'evidence-backed opportunity packet']
  };
  return { ...packet, submissionKit: generateSubmissionKit(packet) };
}

function fallbackAiEnhancement(packet) {
  return {
    pitch: `${packet.title} is a strong target because it connects opportunity discovery with concrete submission execution, reducing missed deadlines and helping builders prioritize high-ROI work.`,
    risk: 'Medium: verify official rules and deadline before submitting; keep registration and wallet actions human-approved.',
    moat: 'Evidence-first opportunity scoring plus reusable submission kits, payout filtering, and MCP-ready persistence/task tracking.'
  };
}

function extractGeminiJson(data) {
  const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('\n') || '';
  const match = text.match(/\{[\s\S]*\}/);
  return JSON.parse(match ? match[0] : text);
}

export async function enhancePacketWithGemini(packet, { apiKey = process.env.GEMINI_API_KEY, fetchImpl = globalThis.fetch, model = 'gemini-1.5-flash' } = {}) {
  if (!apiKey || !fetchImpl) return { ...packet, aiProvider: 'deterministic-fallback', aiEnhancement: fallbackAiEnhancement(packet) };
  const prompt = `You are improving a hackathon submission packet. Return compact JSON with keys pitch, risk, moat. Opportunity: ${JSON.stringify({ title: packet.title, platform: packet.platform, score: packet.score, reward: packet.reward, deadline: packet.deadline, tags: packet.tags })}`;
  try {
    const response = await fetchImpl(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json' } })
    });
    if (!response.ok) throw new Error(`Gemini HTTP ${response.status}`);
    const parsed = extractGeminiJson(await response.json());
    return { ...packet, aiProvider: 'gemini', aiEnhancement: { ...fallbackAiEnhancement(packet), ...parsed } };
  } catch {
    return { ...packet, aiProvider: 'deterministic-fallback', aiEnhancement: fallbackAiEnhancement(packet) };
  }
}

export async function scoutOpportunities(options = {}) {
  const live = await fetchDevpostOpportunities(options);
  const fallback = options.includeFallback === false ? [] : FALLBACK_SOURCES;
  const packets = uniqByUrl([...live, ...fallback])
    .map(buildApplicationPacket)
    .sort((a, b) => b.score - a.score);
  if (options.enhanceWithGemini) return Promise.all(packets.map(packet => enhancePacketWithGemini(packet, options)));
  return packets;
}

export async function runAgent(options = {}) {
  const packets = await scoutOpportunities(options);
  await fs.mkdir('data', { recursive: true });
  await fs.writeFile('data/opportunities.json', JSON.stringify(packets, null, 2));
  return packets;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const packets = await runAgent();
  console.log(JSON.stringify({ generatedAt: new Date().toISOString(), packets }, null, 2));
}
