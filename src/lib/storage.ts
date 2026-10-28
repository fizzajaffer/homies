import {initialState, type CaseState} from './domain.ts';
export interface CaseRepository {load():Promise<CaseState>;save(state:CaseState):Promise<void>;reset():Promise<void>}
export const storageKey='tenant-demo.case.v1';
export class BrowserCaseRepository implements CaseRepository {
 private storage:Pick<Storage,'getItem'|'setItem'|'removeItem'>;
 constructor(storage:Pick<Storage,'getItem'|'setItem'|'removeItem'>){this.storage=storage;}
 async load(){const raw=this.storage.getItem(storageKey);if(!raw)return initialState();const s=JSON.parse(raw);if(s.version!==1||!['renewalArrived','termsConfirmed','paused','signingConfirmed'].every(k=>typeof s[k]==='boolean')||!Array.isArray(s.events)||s.events.some((e:Record<string,unknown>)=>!['renewal-arrived','terms-confirmed','pause','resume','external-signing-confirmed'].includes(String(e.type))||typeof e.at!=='string'||typeof e.id!=='number')||s.termsConfirmed&&!s.renewalArrived||s.signingConfirmed&&!s.termsConfirmed)throw new Error('Saved progress is unreadable. It has been preserved; reset only if you want to discard it.');return s as CaseState;}
 async save(state:CaseState){this.storage.setItem(storageKey,JSON.stringify(state));}
 async reset(){this.storage.removeItem(storageKey);}
}
