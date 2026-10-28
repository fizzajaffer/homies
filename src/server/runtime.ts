import {FoundationRepository,defaultDataRoot} from './repository';
const cache=globalThis as typeof globalThis & {tenantFoundation?:FoundationRepository};
export function repository(){if(!cache.tenantFoundation)cache.tenantFoundation=new FoundationRepository(defaultDataRoot());return cache.tenantFoundation;}
