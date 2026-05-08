import test from 'node:test';
import assert from 'node:assert/strict';
import { buildApplicationPacket, rankOpportunity, scoutOpportunities, generateSubmissionKit, enhancePacketWithGemini } from '../src/agent.js';

test('ranks active AI agent prize opportunities as P0', () => {
  const packet = buildApplicationPacket({ platform:'BuyWhere', type:'developer_challenge', title:'Build With BuyWhere: AI Agent Developer Challenge', url:'https://buywhere.ai/challenge/', deadline:'2026-05-19', reward:'Apple M3 MacBook Air + API credits + swag', tags:['AI','agent','MCP'], effort:2 });
  assert.equal(packet.priority, 'P0');
  assert.ok(packet.actionPlan.length >= 5);
});

test('lower value opportunities receive lower score', () => {
  const high = rankOpportunity({ title:'AI Agent Bounty', platform:'Devpost', type:'hackathon', reward:'$5000', tags:['AI'], effort:2 });
  const low = rankOpportunity({ title:'Local meetup', platform:'Event', type:'event', reward:'none', tags:[], effort:5 });
  assert.ok(high > low);
});

test('scoutOpportunities merges live public results with safe fallback and evidence', async () => {
  const fakeFetch = async (url) => ({
    ok: true,
    json: async () => ({ hackathons: [{
      title: 'Build with MeDo Hackathon',
      url: 'https://medo.devpost.com/',
      submission_period_dates: 'Apr 9 - May 20, 2026',
      prize_amount: '$50,000+',
      themes: [{ name: 'AI' }, { name: 'Low/No Code' }]
    }] })
  });
  const items = await scoutOpportunities({ fetchImpl: fakeFetch, includeFallback: false });
  assert.equal(items.length, 1);
  assert.equal(items[0].sourceMode, 'live-api');
  assert.equal(items[0].evidence.url, 'https://medo.devpost.com/');
  assert.ok(items[0].score >= 60);
});

test('curated fallback includes active BuyWhere and MeDo targets', async () => {
  const fakeFetch = async () => ({ ok: false, json: async () => ({}) });
  const items = await scoutOpportunities({ fetchImpl: fakeFetch });
  assert.ok(items.some(item => item.title.includes('Build With BuyWhere')));
  assert.ok(items.some(item => item.title.includes('Build with MeDo')));
});

test('generateSubmissionKit creates judge-ready assets and human approval boundaries', () => {
  const packet = buildApplicationPacket({ platform:'BuyWhere', type:'developer_challenge', title:'Build With BuyWhere: AI Agent Developer Challenge', url:'https://buywhere.ai/challenge/', deadline:'2026-05-19', reward:'Apple M3 MacBook Air + API credits + swag', tags:['AI','agent','MCP'], effort:2 });
  const kit = generateSubmissionKit(packet);
  assert.match(kit.tagline, /agent/i);
  assert.ok(kit.judgingMap.some(x => x.criterion.includes('Impact')));
  assert.ok(kit.demoScript.some(x => x.time === '0:50-1:40'));
  assert.ok(kit.humanApprovalRequired.includes('final Devpost submission'));
  assert.ok(kit.architecture.includes('database'));
});

test('enhancePacketWithGemini uses Gemini-compatible API response when key is available', async () => {
  const packet = buildApplicationPacket({ platform:'BuyWhere', type:'developer_challenge', title:'Build With BuyWhere: AI Agent Developer Challenge', url:'https://buywhere.ai/challenge/', deadline:'2026-05-19', reward:'Apple M3 MacBook Air + API credits + swag', tags:['AI','agent','MCP'], effort:2 });
  const calls = [];
  const fakeFetch = async (url, options) => {
    calls.push({ url, options });
    return { ok: true, json: async () => ({ candidates: [{ content: { parts: [{ text: JSON.stringify({ pitch: 'Gemini generated pitch', risk: 'Low deadline risk', moat: 'Evidence-first opportunity pipeline' }) }] } }] }) };
  };
  const enhanced = await enhancePacketWithGemini(packet, { apiKey: 'test-key', fetchImpl: fakeFetch });
  assert.equal(enhanced.aiProvider, 'gemini');
  assert.equal(enhanced.aiEnhancement.pitch, 'Gemini generated pitch');
  assert.match(calls[0].url, /generativelanguage.googleapis.com/);
});

test('enhancePacketWithGemini falls back safely without credentials', async () => {
  const packet = buildApplicationPacket({ platform:'BuyWhere', type:'developer_challenge', title:'Build With BuyWhere: AI Agent Developer Challenge', url:'https://buywhere.ai/challenge/', deadline:'2026-05-19', reward:'Apple M3 MacBook Air + API credits + swag', tags:['AI','agent','MCP'], effort:2 });
  const enhanced = await enhancePacketWithGemini(packet, { apiKey: '' });
  assert.equal(enhanced.aiProvider, 'deterministic-fallback');
  assert.match(enhanced.aiEnhancement.pitch, /opportunity discovery/i);
});
