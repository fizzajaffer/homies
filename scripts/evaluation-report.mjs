import {createHash,randomUUID} from 'node:crypto';
export function evaluationReport(log,exitCode,startedAt,finishedAt){
 const count=key=>Number(log.match(new RegExp('^# '+key+' (\\d+)$','m'))?.[1]??0);
 const checks=log.split('\n').filter(l=>/^# MIA_EVAL /.test(l)).map(l=>JSON.parse(l.slice(11)));
 if(new Set(checks.map(c=>c.runId)).size!==checks.length)throw Error('Duplicate evaluation IDs');
 for(const c of checks)if(!c.expected||!c.actual||!c.recordedAt||!c.versions||c.mode!=='executed deterministic mock')throw Error('Missing executed evidence');
 return {runId:randomUUID(),startedAt,finishedAt,command:'npm run verify:unified',mode:'deterministic mocks and local stdio MCP',liveModel:'NOT RUN',outcome:exitCode===0&&count('fail')===0&&count('tests')>0?'passed':'failed',exitCode,total:count('tests'),passed:count('pass'),failed:count('fail'),historicalBaseline:{total:148,retained:134,unified:14,source:'verification/unified-final-tests.log',lintClaim:'Retracted: historical lint log contains an error'},checks,logSha256:createHash('sha256').update(log).digest('hex'),failures:log.split('\n').filter(l=>/^not ok /.test(l))};
}
