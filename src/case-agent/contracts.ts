import {createHash} from 'node:crypto';
export const POLICY='mia-local-v1';
export const LIMITS={steps:8,retries:1,noProgress:2,deadlineMs:120000,modelCalls:0,spend:0} as const;
export type Capability='research'|'negotiation'|'coordination';
export type Status='running'|'interrupted'|'completed'|'partial'|'waiting_user'|'failed'|'cancelled';
export const hash=(v:unknown)=>createHash('sha256').update(JSON.stringify(v)).digest('hex');
export function object(v:unknown,keys:string[]):Record<string,unknown>{if(!v||typeof v!=='object'||Array.isArray(v)||Object.keys(v).some(k=>!keys.includes(k)))throw Error('Unexpected fields');return v as Record<string,unknown>;}
export function text(v:unknown){if(typeof v!=='string'||!v.length||v.length>160)throw Error('Invalid identifier');return v;}
export function integer(v:unknown){if(typeof v!=='number'||!Number.isInteger(v)||v<0)throw Error('Invalid version');return v;}
export type Source={id:string;version:number;text:string;page:string;date:string|null;url:string|null;authority:'synthetic_unverified';untrusted:true;hash:string};
export type Packet={caseId:string;capability:Capability;purpose:string;recordVersions:[string,number][];facts:unknown;sources:Source[];privateEconomics?:{targetBase:unknown;ceiling:unknown};};
export type Run={id:string;caseId:string;capability:Capability;propertyId:string|null;operationId:string;fingerprint:string;status:Status;step:number;noProgress:number;retries:number;startedAt:number;elapsedMs:number;attempt:number;owner:string;dependency:string;pins:{policy:string;skill:string;hash:string;tools:string;provider:string};domainId:string|null;reason:string|null;receipts:{step:number;tool:string;id:string;result:unknown}[];manifest:{versions:[string,number][];sourceIds:string[];contextHash:string}|null;};
export const toolNames=['evidence.read','research.step','negotiation.step','coordination.propose','finish'] as const;
export type ToolName=typeof toolNames[number];
export type Decision={tool:ToolName;arguments:Record<string,never>};
export function decision(v:unknown):Decision{const o=object(v,['tool','arguments']);if(!toolNames.includes(o.tool as ToolName))throw Error('Tool not allowed');const a=object(o.arguments,[]);return {tool:o.tool as ToolName,arguments:a as Record<string,never>};}
