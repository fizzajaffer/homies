// Explicit user-approved migration. Never runs automatically at app startup.
import {FoundationRepository,defaultDataRoot} from '../src/server/repository.ts';import {synchronizeFixture} from '../src/server/fixture-v03.ts';
const repo=new FoundationRepository(defaultDataRoot(),{recover:false});try{console.log(JSON.stringify(synchronizeFixture(repo),null,2));}finally{repo.close();}
