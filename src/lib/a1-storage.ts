import type {Preferences,ResearchResult} from './a1';
export const a1Key='tenant-demo.a1.v1';
export type A1Saved={version:1;prefs:Preferences;result:ResearchResult|null;previous:ResearchResult|null};
export interface A1Repository {load():Promise<A1Saved|null>;save(value:A1Saved):Promise<void>}
export class BrowserA1Repository implements A1Repository{
 async load(){const raw=localStorage.getItem(a1Key);if(!raw)return null;const s=JSON.parse(raw);const validResult=(r:ResearchResult|null)=>r===null||(r&&['ready','no-match','error'].includes(r.status)&&typeof r.asOf==='string'&&typeof r.summary==='string'&&Array.isArray(r.shortlist)&&Array.isArray(r.sources));if(s.version!==1||typeof s.prefs?.maxBase!=='number'||typeof s.prefs?.bedrooms!=='number'||typeof s.prefs?.area!=='string'||typeof s.prefs?.expiry!=='string'||!validResult(s.result)||!validResult(s.previous))throw Error('Unreadable A1 progress');return s as A1Saved;}
 async save(value:A1Saved){localStorage.setItem(a1Key,JSON.stringify(value));}
}
