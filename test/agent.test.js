import test from 'node:test';
import assert from 'node:assert/strict';
import { buildApplicationPacket, rankOpportunity } from '../src/agent.js';

test('ranks AI agent prize opportunities as P0', () => {
  const packet = buildApplicationPacket({ platform:'Devpost', type:'hackathon', title:'Google Cloud Rapid Agent Hackathon', url:'https://rapid-agent.devpost.com/', deadline:'2026-06-11', reward:'$50,000', tags:['AI','agent','Gemini'], effort:4 });
  assert.equal(packet.priority, 'P0');
  assert.ok(packet.actionPlan.length >= 5);
});

test('lower value opportunities receive lower score', () => {
  const high = rankOpportunity({ title:'AI Agent Bounty', platform:'Devpost', type:'hackathon', reward:'$5000', tags:['AI'], effort:2 });
  const low = rankOpportunity({ title:'Local meetup', platform:'Event', type:'event', reward:'none', tags:[], effort:5 });
  assert.ok(high > low);
});
