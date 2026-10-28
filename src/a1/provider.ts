import {isDeepStrictEqual} from 'node:util';
import type {Candidate,Runtime,Result} from './contracts.ts';
import {SYSTEM_PROMPT} from './prompt.ts';
import {parseResult} from './schema.ts';
import {buildResult} from './engine.ts';
export class ProviderError extends Error {code:string;constructor(code:string){super(code);this.code=code;}}
export type OutputContext={stop:string;calls:number;failures:number;prior?:Result;complete:boolean};
export type ModelInput={system:string;runtime:Runtime;candidates:Candidate[];context?:OutputContext};
export interface ModelProvider {capabilities:{name:string;live:boolean;billing?:'mock-zero'|'uncertain'};respond(input:ModelInput,signal:AbortSignal):Promise<unknown>;}
export class AstraAdapter implements ModelProvider {
 capabilities={name:'GPT-6 Astra (not connected)',live:true,billing:'uncertain' as const};
 async respond():Promise<never>{throw new ProviderError('PAID_AND_LIVE_CALLS_DISABLED');}
}
export class MockProvider implements ModelProvider {
 capabilities={name:'deterministic mock; intended GPT-6 Astra',live:false,billing:'mock-zero' as const};
 async respond(input:ModelInput,signal:AbortSignal):Promise<unknown>{if(signal.aborted)throw new ProviderError('STOPPED');return buildResult(input.runtime,input.candidates,input.context??{stop:'completed',calls:4,failures:0,complete:true});}
}
// Structure and deterministic grounding are distinct gates. Prose may vary;
// factual claims, evidence, classification, counts and permissions may not.
function grounded(value:Result){
 const copy=structuredClone(value);
 copy.summary='';copy.questions=[];
 for(const group of [copy.strong_matches,copy.needs_confirmation,copy.near_matches,copy.synthetic,copy.opportunity_ledger])for(const item of group){item.rank_reason='';for(const filter of Object.values(item.filters))filter.reason='';}
 return copy;
}
export function validateResponse(value:unknown,expected:Result):Result{
 let parsed:Result;try{parsed=parseResult(value);}catch{throw new ProviderError('MALFORMED_OUTPUT');}
 if(!isDeepStrictEqual(grounded(parsed),grounded(expected)))throw new ProviderError('OUTPUT_CONTRACT_OR_GROUNDING_MISMATCH');
 return parsed;
}
export async function invokeMock(provider:ModelProvider,runtime:Runtime,candidates:Candidate[],signal:AbortSignal,context:OutputContext={stop:'completed',calls:4,failures:0,complete:true}){
 if(provider.capabilities.live)throw new ProviderError('PAID_AND_LIVE_CALLS_DISABLED');
 // Estimate explicitly includes all locally supplied prompt/runtime/candidate/context bytes.
 const runtimeEstimate=Math.ceil(Buffer.byteLength(SYSTEM_PROMPT+JSON.stringify(runtime),'utf8')/3);
 if(runtimeEstimate>runtime.run_limits.maxLocalInputTokens)throw new ProviderError('LOCAL_INPUT_BOUND');
 const localBytes=Buffer.byteLength(SYSTEM_PROMPT+JSON.stringify({runtime,candidates,context}),'utf8');
 // No live tokenizer is claimed; the mock envelope is bounded separately from paid-token policy.
 if(localBytes>200000)throw new ProviderError('LOCAL_INPUT_BOUND');
 const result=await provider.respond({system:SYSTEM_PROMPT,runtime,candidates,context},signal);
 if(Buffer.byteLength(JSON.stringify(result),'utf8')>200000)throw new ProviderError('OUTPUT_BOUND');
 return validateResponse(result,buildResult(runtime,candidates,context));
}
