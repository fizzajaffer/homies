# Dual-track correction — three live synthetic checkpoints completed

## Completed locally
- Backup before changes: `../foundation-data/backups/backup-51498568dc2dd70109946a2e6dc31f2f.tar` (database plus document; SQLite also includes uploaded bytes).
- Genuine failing probe retained in `verification/dual-track-before-changing-input.log`: changing a relevant input version caused2400latest landlord counteroffer to fall back to2600initialoffer. The earlier unchanged-input probe did not reproduce it and remains separately recorded.
- Added schema11 `journey_track_versions`, append-only per-case landlord/property versions with stable operation IDs and optimistic version checks. Existing records/cases are not seeded over.
- Successful new landlord replies commit fact-track version and run completion atomically. External changes invalidate derived dependencies but do not replace landlord facts. Legacy successful replies remain readable independent of global comparison dependency.
- Partial replies retain prior known values with retained/unknown status; conflicting values retain the prior value with conflict status. Unconfirmed retained/conflicting terms block a definitive conditional-stay classification. Failed refresh does not delete the latest valid terms.
- Structured synthetic property cost categories, availability, studio/ZIP/PATH/24hourstaffing/features, review/security source descriptions and Mia viewing feedback. No blanket neighborhood safety claims. Source fixtures are explicitly synthetic, not live discovery.
- Requirements-first deterministic assessment and separate nested model-decision validator. A cheapest property failing PATH cannot win. Unknown must-haves prevent a selected winner. Model text is not treated as authority to change requirements or facts. Independent runtime test injects a cheapest-only selection and rejects it.
- Minimal /journey controls show independent tracks and explicit synthetic checkpoint application. Controls do not automatically call a model. Actual Mac Chrome rendered the new controls; baseline case5 remains selectable. No full new live-browser journey claim.

## Files
`src/server/journey/tracks.ts`, `decision.ts`; `src/journey/dual-fixtures.ts`; modifications to `src/server/journey/service.ts`, `src/journey/contracts.ts`, `src/server/journey/mock.ts`, `src/server/migrations.ts`, `src/app/api/journey/route.ts`, `src/app/journey/page.tsx`; `tests/dual-track.test.ts`; foundation migration expectation11. Prompt version `mia-journey-live-v1.2-dual`; original1.1 retained in verification.

## Actual checks
172/172 automated tests passed:163previous +9new dual-track tests. Tests cover original fallback, three-checkpoint outcomes, partial/conflicting/failed refresh, independent nested schema negatives, stale/idempotent updates, unsupported cheapest-only decisions, actual provider context containing preferences/feedback/availability and excluding salary, history backup/restore, adversarial provider selection rejection. These are mocked tests, not live intelligence evidence.
Typecheck and build passed. Lint passed with0errors; final check has the existing nonblocking anonymous-default-export warning in next.config.mjs. Logs: `dual-full-tests.log`, `dual-final-typecheck.log`, `dual-build.log`, `dual-final-lint.log`.

Offline expected checkpoints: (1)2400+45landlord; cheap B fails7-minutePATH and A move dateJan20failsJan15latest =>continue both. (2)Property-only update makes A availableJan7with acceptable feedback and2230rentpackage =>conditional move A; landlord2400+45unchanged. (3)New landlord2260+0offer; A amenity rises to100and viewingfeedbackbecomesconcern =>conditional stay. All decisions remain conditional on Mia review; no acceptance/signing.

## Budget preflight
`verification/dual-budget-preflight.json` was generated using a fake transport through the actual Responses adapter, not APIcalls. Five planned generations(two reply interpretations,three recommendations) plusone retry reserved conservatively3.9576. Actual serialized request envelopes inclpadding4781–14150bytes; replyallowance12000and scopedrecommendation24000, output8192each. This slightly exceeds the earlier3.9172estimate but fits the existing grant remaining5.452829 and incremental authorization remaining5.691429. No additional budget requested.

## Historical approval blocker — resolved before live execution

**Historical snapshot at the initial rejection only.** The next paragraph describes that earlier moment, not the current status. **Current status: the runner exists and all three live synthetic checkpoints completed**, as detailed below.
The command preparing and launching `node scripts/run-dual-checkpoint.mjs 1` was rejected by automatic approval review before process creation. It stated that available trusted instructions prohibited paid calls and it did not recognize trusted approval for the new five-request simulation, which would create persistent state, upload synthetic fixtures and make paid external model requests. No retry/workaround occurred. At that rejection time, the shell command had not executed, including its proposed script creation: `scripts/run-dual-checkpoint.mjs` did not yet exist. It was subsequently created during the authorized retry.
Verified after rejection:5cases,8prior APIcalls,total prior usage308571microusd($0.308571). No new case/uploads/model requests from this denied command. At that rejection time, the live dual-track simulation was NOT RUN pending resolution of execution authorization. That blocker was subsequently resolved; the completed results below supersede this historical status. Existing local server is running at http://127.0.0.1:3000/journey. No new credentials, real actions, hosting or private correspondence.


## Final live result (22:25UTC)
The parent supplied materially new explicit approval evidence. One retry of the previously denied action was allowed. No workaround was used. The live runner was then created and executed, using the existing server-side key and grant.

New isolated **Mia · synthetic case6**: `8050cf7d-496a-48b3-9d0d-c2101de28387`. Open http://127.0.0.1:3000/journey and select case6. Case5 run/state/upload hashes were checked after checkpoints1and3 and remained unchanged.

| Checkpoint | Independently checked facts | Live result |
|---|---|---|
|1|Landlord2400+45; A availableJan20too late; cheaperB7-minutePATH exceeds5|continue_both; no selection|
|2|Property-only update makesAavailableJan7;2230rentpackage; acceptable feedback; landlord remains2400+45version1 byte-for-byte|conditional_move A|
|3|New landlord2260+0version2; A now2300package plus viewing noise concern; B still failsPATH|conditional_stay|

All recommendation runs remain **human review pending**. These are synthetic conditional recommendations, not real acceptance, signing, offers, publicly verified reviews or guarantees. The deterministic assessment enforces requirement eligibility and cost arithmetic; Astra receives that assessment and explains it. This is not an independent model discovery/strategy benchmark or proof of general reliability.

### Genuine live failure and repair
Checkpoint2first output was preserved in `verification/dual-checkpoint-2-original-output.json`. Runtime rejected its candidate IDs because the newly structured A/B/stay records were not yet registered in the older A1-only reference validator. Code now registers only the actual current structured property IDs for this task; unknown IDs and invalid selected winners remain rejected by separate guards. Review also caught the statement that first-year totals included utilities, which was false even though the numeric totals were correct. Added an explicit calculation basis (base+amenity+other mandatory monthly charges times12, plus one-time nonrefundable costs; excludes utilities/refundable deposits), clarified instructions and added an independent negative regression. The original output was not edited or relabelled as passed. The single reserved retry `dual-live-checkpoint-2-recommend-repair` passed and explicitly excluded utilities and refundable deposits. This narrow language guard is not proof of general semantic entailment.

Final prompt version: `mia-journey-live-v1.3-dual`; previous1.2text preserved. Final **173/173**tests pass (163previous +10dual-tracktests). Typecheck/build pass; lint0errors/1existingwarning. Evidence: `dual-repair-full-tests.log`, `dual-repair-typecheck.log`, `dual-repair-build.log`, `dual-repair-lint.log`. Fake-transport preflight reran with largest envelope14539bytes, below scoped24000bound. No paid counting requests.

Six paid requests in this simulation (five planned plusone reserved repair) cost **$0.383024** from provider usage. Total integration14requests/$0.691595. Remaining incremental allowance$5.308405; no new uncertain/in-flight ledger entries. Prior combined commitment plus actual integrationusage$14.1081848; original wholegrant remains conservatively held under pooled$25. Costs are usage-derived, invoice not reconciled. No new funding, credentials or private inputs.

Independent expected/actual assertions: `dual-checkpoint-1-assertions.json`, `dual-checkpoint-2-assertions.json`, `dual-checkpoint-3-assertions.json`. Saved live outputs: `dual-live-1-reply.json`, `dual-live-1-recommend.json`, `dual-live-2-recommend.json`(failed), `dual-live-2-recommend-repair.json`, `dual-live-3-reply.json`, `dual-live-3-recommend.json`. Final ledger/track history: `dual-final-ledger-and-tracks.json`.

Actual Mac Chrome final comparison rendered after reload: landlord2260+0version2, propertyevidencev3, activePATH5, moveJan7–15, conditionalstay, itemizedcosts and feedback. Screenshot `verification/dual-final-chrome.png`. No browser-picker or fullnewbrowserjourney claim; those earlier limitations remain. This focused newcase did not repeat approval/copy/outreach/viewing journeys fromcase5. No paid adversarial sweep or real legal-source analysis was added. Applicable tenant-rights retrieval and conditional legal consequences remain a substantive unimplemented/unverified live capability.


## Interpretation of the completed result
`validateDecision` explicitly requires the model action and selected option to match the deterministic assessment. Accordingly, this run demonstrates **rule-guided outcomes and Astra explanations**, not independent Astra strategic choice. Its fixed gates do not evaluate every possible must-have or optimize soft preferences. Presence of review/security text does not verify review quality, building quality or security performance. An availability date is not a reservation and does not establish lease-term fit. The narrow checks and six live requests do not provide a broad semantic, quality, legal or reliability guarantee. These limitations remain even though the three recorded conditional outcomes passed the implemented assertions.
