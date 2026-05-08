import fs from 'node:fs/promises';
import crypto from 'node:crypto';

const SOURCES = [
  { platform: 'Devpost', type: 'hackathon', title: 'Google Cloud Rapid Agent Hackathon', url: 'https://rapid-agent.devpost.com/', deadline: '2026-06-11 14:00 PDT', reward: '$50,000', tags: ['AI', 'agent', 'Gemini', 'Google Cloud'], effort: 4 },
  { platform: 'Devpost', type: 'hackathon', title: 'Build with MeDo Hackathon', url: 'https://medo.devpost.com/', deadline: '2026-05-20', reward: '$50,000', tags: ['AI', 'no-code', 'automation'], effort: 2 },
  { platform: 'Superteam Earn', type: 'bounty', title: 'Solana AI tooling bounty', url: 'https://earn.superteam.fun/', deadline: 'rolling', reward: 'varies', tags: ['web3', 'solana', 'bounty'], effort: 3 },
  { platform: 'DoraHacks', type: 'web3_hackathon', title: 'AI x Web3 BUIDL opportunities', url: 'https://dorahacks.io/hackathon', deadline: 'varies', reward: 'varies', tags: ['web3', 'crypto', 'buidl'], effort: 3 }
];

function hash(input) { return crypto.createHash('sha256').update(input).digest('hex').slice(0, 12); }
function hasAny(text, words) { const t = text.toLowerCase(); return words.some(w => t.includes(w.toLowerCase())); }

export function rankOpportunity(item, profile = {}) {
  const target = `${item.title} ${item.platform} ${item.type} ${item.tags?.join(' ') || ''}`;
  let score = 0;
  if (hasAny(target, ['agent', 'gemini', 'llm', 'ai'])) score += 35;
  if (hasAny(target, ['web3', 'crypto', 'solana', 'ethereum', 'bounty'])) score += 20;
  if (String(item.reward || '').match(/\$|usd|usdc|cash/i)) score += 20;
  if (String(item.deadline || '').match(/rolling|2026-06|2026-05/i)) score += 12;
  score += Math.max(0, 18 - (item.effort || 3) * 3);
  if (profile.preferRemote !== false) score += 6;
  return Math.min(100, score);
}

export function makeActionPlan(item) {
  const repoSlug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 48);
  return [
    `Confirm eligibility, submission deadline, prize track, and required artifacts for ${item.platform}.`,
    `Join/register for the opportunity and save confirmation evidence.`,
    `Create public GitHub repo: ${repoSlug}.`,
    `Build a focused MVP aligned with the sponsor track and judging criteria.`,
    `Record a 3 minute demo: problem, agent workflow, live task execution, impact, architecture.`,
    `Submit hosted URL, GitHub URL, video URL, selected track, and concise project description.`
  ];
}

export function buildApplicationPacket(item) {
  const score = rankOpportunity(item, { preferRemote: true });
  return {
    id: hash(item.platform + item.title + item.url),
    score,
    priority: score >= 75 ? 'P0' : score >= 55 ? 'P1' : 'P2',
    ...item,
    pitch: `Hackathon Scout Agent turns opportunity discovery into action: it monitors AI/Web3 hackathons and bounties, ranks them by expected ROI, prepares application packets, and keeps the human in control for final submission.`,
    actionPlan: makeActionPlan(item),
    deliverables: ['public GitHub repo', 'hosted demo URL', '~3 minute demo video', 'Devpost submission form']
  };
}

export async function runAgent() {
  const packets = SOURCES.map(buildApplicationPacket).sort((a, b) => b.score - a.score);
  await fs.mkdir('data', { recursive: true });
  await fs.writeFile('data/opportunities.json', JSON.stringify(packets, null, 2));
  return packets;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const packets = await runAgent();
  console.log(JSON.stringify({ generatedAt: new Date().toISOString(), packets }, null, 2));
}
