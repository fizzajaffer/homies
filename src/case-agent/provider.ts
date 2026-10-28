import {parseOutgoing,type Outgoing} from './outgoing.ts';
import type {Decision,Packet,ToolName} from './contracts.ts';
export type ModelInput={runId:string;stepId:number;core:string;skill:string;packet:Packet;allowedTools:ToolName[];outputSchema:'mia.decision.v1';timeoutMs:number;maxOutputTokens:number;};
export interface CaseProvider{readonly name:string;readonly live:boolean;next(input:ModelInput,signal:AbortSignal):Promise<unknown>;draft?(input:Outgoing,signal:AbortSignal):Promise<unknown>;}
export class MockCaseProvider implements CaseProvider{readonly name='deterministic-case-mock-v1';readonly live=false;async draft(raw:Outgoing,signal:AbortSignal){if(signal.aborted)throw Error('Cancelled');const i=parseOutgoing(raw);return {text:i.template,evidence:i.evidence,disclosures:i.disclosures};}async next(i:ModelInput,signal:AbortSignal):Promise<Decision>{if(signal.aborted)throw Error('Cancelled');return {tool:i.allowedTools[0],arguments:{}};}}
export class AstraCaseProvider implements CaseProvider{readonly name='GPT-6 Astra — endpoint not verified';readonly live=true;async next():Promise<never>{throw Error('LIVE_PAID_GATE_OFF');}}
