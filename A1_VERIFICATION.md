> Latest approved correction and policy evidence: see CORRECTIONS_VERIFICATION.md. Its results supersede earlier pending-policy and semantic-guard conclusions below; historical logs remain retained.

# A1 v0.5 implementation verification

Initial checkpoint, subsequently corrected below, 25 October 2026 UTC (24 October evening in America/New_York). This is deterministic mocked A1, not a live rental-search or model-quality certification.

## Authoritative input

Library `libfile_dc5d82260f9c8191bf9383b4cd4f8d3e`, version 1, `A1_Demo_Review_Proposed_v0_5.docx`, materialized to `../prds/a1-v05/`. Verified 50,153 local bytes and read the complete DOCX text before implementation. The document itself was not modified. Its historical “not approved” banner was superseded only by the user's explicit implementation approval supplied in the delegation. Paid stages remain unapproved.

`src/a1/prompt.ts` preserves the reviewed SYSTEM sections verbatim. The later explicit current-run freshness/on-demand policies are enforced independently in application code.

## Deliverables

- `src/a1/contracts.ts`, `prompt.ts`, `engine.ts`, `fixtures.ts`, `provider.ts`: typed runtime/full result, frozen prompt, evidence-backed filtering/ranking/counts, deterministic scenarios and replaceable mock/Astra boundary.
- `src/server/a1/service.ts`: persisted bounded orchestration, lock, stable operations, stop/deadline, interruption/manual resume, preference versions, memory confirmation and preparation records.
- Schema migration 5: A1 runs, trace, evidence and memory provenance. Earlier cases, histories and documents preserved. Backup includes the new tables.
- `/a1` and `/api/a1`: local result/review/history screen, explicit triggers, checkpoint controls, clear synthetic labeling, count-based demo expansion approval and retry of the same operation ID. No A2/A3 execution endpoints.
- `tests/a1-v05.test.ts`: deterministic acceptance/regression coverage. Existing foundation and earlier isolated regression tests remain.

## Initial results (superseded by correction checkpoint)

Initial `npm test`: **36 passed, 0 failed** (16 A1 v0.5 + 10 foundation + 5 core + 5 preserved A3 regression tests; not 20 foundation tests). Full output: `verification/a1-final-tests.log`.

Lint, TypeScript check and production build passed (`verification/a1-lint.log`, `a1-typecheck.log`, `a1-build.log`). The last added pending-stop regression changed tests only; the final app build is unchanged from the successful checked build.

| Matrix area | Observed deterministic result |
|---|---|
| S1 costs/ranking | 2265 passes, 2266 fails, unknown mandatory fees need confirmation; 2245 is not preferred; 2244 is preferred. 2245/5-minute option ranks before 2250/3-minute option. Maximum three real strong matches. |
| Move dates | Dec 31 passes; Jan 1 fails; Dec 23 preferred. |
| S2 evidence | Missing features, daytime staffing, unknown staffing, stale/conflicting/unrechecked prices and availability cannot be eligible. Publication and retrieval fields retained. |
| S3 PATH | 0–5 passes; 6–10 is outside the initial active limit; over 10 excluded; unknown route/method excluded from qualifying counts. Same-set synthetic count is 0→2, added 2; verified-real count remains 0. Approval changes only after explicit confirmation. |
| S4 readiness/outcomes | Oct 16 closed/Oct 17 open in explicit local timezone; on-demand can start earlier. No trigger rejected. Source failure distinct from no verified match. |
| S5 privacy/injection | Embedded instructions do not change preferences, memory or permissions. Runtime excludes salary/private target. Astra live path rejects. Selection-only/consent-only insufficient; complete exact-action simulated consent contract can permit simulation preparation only. |
| S6 versions/memory | Material deltas reference prior findings. Changed inputs/historical versions invalidate handoff views. Inferred memory rejected; explicit correction stores provenance and supersession. |
| Bounds/failures | Single active run, duplicate operations/stages, stop, pending-provider timeout, late response after stop, malformed/unknown output IDs, provider failure and missing-input state tested. No retries or silent provider substitution. |
| Persistence | Reopen marks interruption; manual resume preserves completed stages and one model attempt. Case isolation enforced. A1 backup restore retains completed runs and 32 source-evidence rows. |
| Opportunity ledger | Previous opportunities retained as stale after source failure, excluded from active counts. Current inspected count distinct from retained history. |

All “real” candidate branches in deterministic tests use synthetic answer-key fixtures temporarily labeled real to test classification; they are never loaded as real evidence into the demo. The app's mock sources return synthetic records only.

## Genuine failures and fixes

1. First suite: Node strip-only execution rejected TypeScript constructor parameter properties. Replaced those with explicit property assignments. Preserved `verification/a1-first-failure.log`; rerun passed in `a1-rerun.log`.
2. First lint pass: React effect-state rule and internal HTML-link rule failed. Switched initial loading to an asynchronous effect callback and internal navigation to Next Link. Final lint passed. The exact initial lint output was not saved; this entry records its observed diagnostics.
3. Chrome QA revealed a coverage label counting two retained historical opportunities as currently inspected. Added a failing regression (`verification/a1-coverage-failure.log`), separated current inspection count from retained history, reran all critical tests and Chrome scenario. Final screen: four inspected, two older retained; PATH still 0→2. Prior persisted findings remain historical evidence rather than being overwritten.

No failures were hidden by changing expected fixture answers or inventing evaluation scores.

## Initial Mac Chrome verification

Used the supported Chrome extension on the user's Mac, not a cloud browser or an HTTP-only probe. Verified actual DOM and screenshots at `http://127.0.0.1:3000/a1`.

- Started S1; one completed stage survived browser reload.
- Actually stopped/restarted the local Next server. The same run displayed interrupted with one saved stage, no automatic execution.
- Manually resumed, completed remaining stages and review. Two synthetic eligible examples appeared in the expected order, zero live matches, one mock model request, $0 cost.
- Explicit simulated refresh ran S3 and showed 0→2 synthetic qualifying counts without changing the five-minute active preference.
- After the coverage-label fix, rebuilt/restarted and ran S3 again. Final persisted findings version 3 shows four current inspected candidates and two stale carried opportunities separately; over-ten example explicitly excluded.
- Reload retained the result. Original foundation screen still showed schema 5, both original cases, search version 6, housing version 1, private finance version 2, 13 foundation events and the original 161-byte synthetic document.
- At 390×844 Chrome viewport, inspected the screen visually and measured viewport/document width both 390. Reset viewport afterward. Physical mobile devices, screen readers and a formal accessibility audit were not tested.
- Left the A1 tab open and the loopback server running; PID 16289 at the final process check. A process can stop later; a local link requires this Mac and its server.

## Not run / pending gates

Actual Astra capability/account verification, real tokenizer validation, 12-call A/B evaluation, real web research, current-date human source verification, anchored human scores, paid reruns/judge/integration tests, A2/A3 execution and hosting are **NOT RUN**. No model reliability scores or production claim.

Local input accounting is a mock estimate (UTF-8 bytes/3), not a verified Astra token count. Actual paid/API calls and billable usage were zero. The live adapter is permanently blocked in this checkpoint; live transport, account access, freshness thresholds beyond the explicitly approved current-run rechecks, and budgets need separate approval and tests. Mock tests cannot prove a model resists real prompt injection or guarantee factual source accuracy.

The UI exposes each research stage explicitly for checkpoint inspection; nothing executes automatically after reopening. Data remains in `../foundation-data/`, excluded from Git. No credentials, private correspondence, real leases, purchases, messages or deployment were used.


## Correction checkpoint — 25 October 2026, 00:43 UTC

Current status: corrected deterministic mock checks pass. This supersedes the initial completion claim and its fixed-stage/IDs-only boundary description. It does not certify model capability or live research.

**48 tests passed, 0 failed:** 16 original A1 + 12 new A1 gap regressions + 10 foundation + 5 core + 5 preserved legacy A3 tests. Legacy tests are isolated; no A3 implementation was added. Evidence: `verification/a1-gap-final-tests.log`. Lint, typecheck and production build passed in `a1-gap-lint.log`, `a1-gap-typecheck.log`, `a1-gap-build.log` after the final code correction. Documentation-only edits followed.

### Genuine failure → fix → retest

The seven failing baseline regressions remain in `verification/a1-gap-baseline-failures.log`. No log was overwritten to conceal failure.

| Expected / actual before fix | Correction and passing regression |
|---|---|
| Conflicting values under the same evidence ID must remain unknown; one silently replaced the other. | Preserve conflicting variants with origin identity and conflict flags; both values remain inspectable and qualification stays unknown. |
| Invalid walking values must not qualify; negative/non-finite values could enter comparative counts. | Finite, nonnegative validation shared by filtering/counts; negative, NaN and Infinity excluded. |
| Retrieval-time-only updates must not be material; they produced deltas. | Semantic projection excludes retrieval/recheck metadata while retaining qualification/cost/availability facts. |
| Expansion must bind latest findings; an older completed run could approve it. | Require latest run, matching constraints version, current validation revision, completed state and positive supported counts. |
| Freshness must bind source identity to current run; timestamp alone qualified. | Require evidence ID and checked-in-run ID, valid bounded retrieval time; later current-run retrieval accepted, wrong-run identity rejected. |
| Manual stop should abort pending work; only late persistence was blocked. | AbortController/AbortSignal and abort race, late completion suppressed; uncertain pending cost retained rather than represented as zero. |
| Provider must return full contract; it returned only IDs. | Full Result envelope validated against independently computed deterministic result. Nested cost/count tampering, missing fields and extra fields rejected. |

Additional new regressions cover adaptive source-failure fallback, unknown-fact verification, no-progress/cap stopping; duplicate pending advance suppression; uncertain-cost stop; invalidation of pre-correction findings; and stage-level material deltas. The last regression followed a real Chrome observation: repeated blocked-source stages reannounced the same changes. Comparing against the preceding stage’s retained ledger fixed it. That original trace remains in saved run history; this last issue did not have a separately captured failing test run. First correction retest: `a1-gap-first-retest.log`; final suite: `a1-gap-final-tests.log`.

### Code and data changes

Changed contracts, engine, fixtures, provider, server A1 service, migrations, A1 screen, original A1/foundation tests; added `src/a1/strategy.ts` and `tests/a1-gaps.test.ts`. SQLite migration 6 adds cost status without resetting records. Source-stage evidence, checkpoint and material-delta writes are transactional. Older findings remain readable but cannot authorize current actions. The 5-minute active preference is unchanged. SYSTEM prompt remains unchanged and was independently compared to the DOCX SYSTEM sections: exact 5,509 characters, excluding the document’s continuation heading.

### Actual Mac Chrome recheck

The supported Mac Chrome extension rendered the production build at `http://127.0.0.1:3000/a1`, not merely an HTTP probe. Verified old findings retained but invalid for expansion. Executed S4 discovery/fallback for both ZIPs: source failure remained distinct, zero current candidates, older opportunities retained, zero qualifying counts. Rebuilt and restarted after the stage-delta fix. Executed explicit S3 refresh and full structured mock validation, then reloaded. Findings version 5 persisted: four inspected, two historical opportunities, synthetic PATH counts 0→2, verified-real added count 0; unknown fees remain unknown and 11-minute option excluded. Search version 6, active limit 5, both original cases remain visible. No expansion approval was clicked. Server remains running on loopback, with the A1 Chrome tab retained. Initial mobile 390×844 QA is recorded above; mobile was not repeated for these logic-only corrections.

### Limits that remain explicit

- Adaptive paths are deterministic mock orchestration, not evidence of real source coverage, market exhaustion or model resourcefulness.
- Full envelope validation is deliberately exact against a deterministic answer key. General live model responses and prose variation are untested; strict validation fails closed. Schema checks alone do not prove prompt-injection resistance.
- Input token accounting is an estimate. Full mock output uses a 200,000-byte memory bound, **not** verified 4,000-token enforcement. Actual tokenizer/output limits and provider-added search accounting remain gated; no paid transport exists.
- A2/A3 outputs are preparation records only. Integrated downstream authorization and real consent-to-action execution remain untested and unimplemented.
- Live model quality, live research, paid calls, human evaluation, hosting and production security remain NOT RUN. No fabricated scores or capability claims.


## Independent schema and integrated no-progress checkpoint

Supersedes the exact-whole-answer-key limitation above. Added `src/a1/schema.ts`, with explicit independent validators for the complete Result, assessed candidate groups, claims, evidence, filters, counts and handoffs. It imports only the Result type and has no engine/fixture dependency. Unknown keys are rejected at each object level; malformed values/groups are rejected. A separate semantic gate retains deterministic claims/evidence/filter/count/permission checks while allowing summary, question, rank explanation and filter explanation variation. This does not establish truthfulness of arbitrary prose; live evaluation remains required.

Added negative nested mutations for claim types, evidence extra fields/types, candidate-group shape, handoff permissions/extra fields and filter extra fields; positive schema and prose-variation cases; and schema-valid invented-claim/evidence rejection by the separate grounding gate.

Added end-to-end no-progress regression using a confirmed single-ZIP test profile: discovery → verification → equivalent alternate with no new evidence → completed at three source calls, below four-call cap, one provider request. Separate controlled source failure produces genuine fallback evidence and continues through four stages; it does not stop prematurely. The injectable source function defaults to the same deterministic mock and adds no network transport. The existing two-ZIP profile remains unchanged and normally uses all four permitted stages.

Final checks: **50 passed, 0 failed** = 16 original A1 + 14 A1 correction + 10 foundation + 5 core + 5 preserved legacy A3. Logs: `verification/a1-schema-progress-tests.log`, `a1-schema-typecheck.log`, `a1-schema-lint.log`, `a1-schema-build.log`; all passed. No new failing baseline was manufactured: these additional cases passed on their first run. Earlier genuine failure logs remain intact.

Restarted the production server and reloaded the actual Mac Chrome A1 page. Findings version 5, search version 6, active PATH limit 5 and both existing cases remained visible. No UI structure changed; mobile QA was not repeated. Server remains loopback-only.

Still NOT RUN: live tokenizer/model/source validation, prose quality and prompt-injection evaluations, A2/A3 integrated execution/authorization, hosting. The 4,000 output-token value is still a declared policy, not verified token enforcement; byte bounds are memory guards. A future approved live adapter must set the provider's max_output_tokens and verify its accounting before use. No tokenizer dependency, paid call, new credential or live transport was added.
