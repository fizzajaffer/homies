import {FoundationRepository,defaultDataRoot} from '../src/server/repository.ts';
const [command,source,destination]=process.argv.slice(2);
if(command==='backup'){const repo=new FoundationRepository(defaultDataRoot(),{recover:false});try{console.log(JSON.stringify(repo.backup(),null,2));}finally{repo.close();}}
else if(command==='restore'&&source&&destination){console.log(FoundationRepository.restore(source,destination));}
else{console.error('Usage: node --experimental-strip-types scripts/foundation-storage.ts backup | restore EXTRACTED_BUNDLE EMPTY_DESTINATION');process.exitCode=1;}
