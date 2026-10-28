import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {POLICY,hash} from '../src/case-agent/contracts.ts';
import {CORE,catalog,skill} from '../src/case-agent/skills.ts';
export function observed(name:string,kind:'capability'|'end-to-end',expected:unknown,actual:unknown){
 assert.deepEqual(actual,expected);
 console.log('MIA_EVAL '+JSON.stringify({runId:randomUUID(),name,kind,recordedAt:new Date().toISOString(),mode:'executed deterministic mock',liveModel:'NOT RUN',versions:{policy:POLICY,coreHash:hash(CORE),skills:catalog.map(s=>({id:s.id,version:s.version,hash:skill(s.id).hash}))},expected,actual,outcome:'passed'}));
}
