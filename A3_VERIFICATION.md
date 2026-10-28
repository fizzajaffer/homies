# A3 v0.2 local simulated checkpoint

Verified 25 October 2026 UTC (24 October evening Eastern). This is a deterministic, local simulation. It is not a live-email/calendar integration or model-quality certification.

## Authoritative document and preserved scope

Read the complete eight-page content-v0.2 review, including SYSTEM, runtime/proposal/event contracts, all 33 expected-only cases and troubleshooting appendix. Library ID `libfile_0058c96c63cc819199ed913fa1890a5d`, Library version 1, original filename `A3_Demo_Review_Proposed_v0_1.docx`. Supported materialization placed 52,288 readable bytes at `../prds/a3-v02/`. The historical proposal banner was superseded by the user's explicit build approval; the document was not edited. `src/a3/prompt.ts` stores the complete SYSTEM role/actions/coordination/evidence text, versioned a3-v0.2. Test expectations remain outside runtime.

No paid calls, real sending, calls, calendar access, applications, ID, payment, signing, hosting, GitHub push or A2 execution. All communication adapters are local state transitions. Existing A1 behavior and its tests remain intact.

## Implementation

- `src/a3/contracts.ts`, `schema.ts`, `prompt.ts`: typed versioned contracts and independent runtime validators. These schemas do not compare output with the builder that produced it. Unknown fields, malformed nested claims, unauthorized enums and invalid event payloads fail closed.
- `src/a3/scheduling.ts`: explicit offset plus IANA zone validation; local-time roundtrip; repeated/nonexistent time rejection; approved dates/hours/weekends, duration and travel-buffer collision checks.
- `src/a3/report.ts`: known subtotals separated into recurring, one-time nonrefundable and refundable amounts; unknown/conflicting amounts excluded and listed. Conditional concessions are not silently applied. Separate synthetic estimate records retain ranges, assumptions and dates.
- `src/server/a3/service.ts`: A1 selection/current-findings check; property-scoped versioned consent; execution-time authorization inside SQLite transaction; idempotent ledger, immutable aggregate snapshots, record-plus-outbox commit, explicit event delivery against exact committed snapshots and deduplicated recorded-only receipts.
- Schema 7 adds A3 properties, snapshots, viewing preferences/history, preference operation receipts, action ledger, outbox, receipts and audit. Existing SQLite/document storage is retained. Current Mac data check: two original cases, one original 161-byte synthetic document, five A1 runs, two A3 properties. No reset/reseed.
- `/a3` and `/api/a3`: selection from current A1 findings, separate yes/no consent, bundled viewing preferences, proposed-message review, simulated sends/replies, costs/history/conflicts, request/exact property confirmation, demo-time followups, manual-call checklist, Mia reports, held research requests and A2 receipts. A1 navigation links to this flow.

Selection does not authorize action. Consent includes property, synthetic recipient, action/disclosure scope, timestamp, version and revocation. Two followups are counted across the conversation; each requires an explicit unused demo-advance event. No background execution. Queued proposals are cleared by revocation/cancellation, and stale state is rejected. Costs may arrive after revocation as evidence, but cannot renew permission or send anything.

The demo uses deterministic safe message templates. Runtime schemas are independent, but arbitrary model-written drafts are deliberately not executed: outgoing text must match the approved mock template and declared disclosures. No actual model was evaluated or used for extraction.

## Final checks and counts

**93 total tests passed, 0 failed:**

- 33 new document-mapped A3 cases, named A3-01 through A3-33.
- 10 additional A3 adversarial/integration/report tests.
- 30 existing current A1 tests.
- 10 foundation tests.
- 5 core tests.
- 5 preserved legacy A3 tests, not counted as proving v0.2.

Evidence: `verification/a3-final-tests.log`. Typecheck, lint (no warnings) and production build passed: `a3-typecheck.log`, `a3-lint.log`, `a3-build.log`. Code hashes are in `a3-code-sha256.txt`; source document/prompt hashes and identity are recorded in `a3-source.json`.

## Document matrix coverage

| IDs | Actual deterministic assertions |
|---|---|
| 01–04 | Selected+yes required; wrong property/recipient/action/disclosure denied; post-draft revocation blocks; real/sensitive proposal actions rejected; no private income in runtime. |
| 05–09 | Bundled preferences reused; 30+30 defaults and explicit overrides; window/travel collisions; missing/invalid/repeated/nonexistent local times denied; request remains requested until exact simulated property confirmation. |
| 10–12 | Global two-followup cap; explicit forward demo advance required and consumed once; fictional noncallable checklist after exhaustion. |
| 13–17 | Initial cost outreach before dates; incremental outbox; unknowns retained; concession conditions/gross rent separated; late conflicting claims retained; Mia origins/dates; untrusted instructions do not change consent or send. |
| 18–21 | Independent malformed/extra-field schema checks; missing evidence rejection; stale state denial; injected precommit failure rolls back aggregate/outbox/ledger; same action replay returns the saved effect. |
| 22–23 | Events explicitly delivered in reverse version order against their own committed snapshots; receipt dedup; material review, explicit minor batch boundary and unclassified review. |
| 24–27 | Step/retry limits and manual recovery stop; model-call flag false; no stay/move action; queue cleared on revocation; persisted outbox replay; property and case authority isolation. |
| 28–29 | Per-property statuses, ten cost fields with unknowns/sources/dates, next action; itemized neutral template without urgency, income, budget or negotiation strategy. |
| 30–33 | Property then Mia clarification required; research remains recorded_not_dispatched; actual fees remain unknown beside separate dated synthetic estimates; no A2 sensitivity result; normalized field-set request dedup with zero hop/call/spend budgets. |

Additional tests cover four adversarial gaps below, A1 refresh invalidation, real database close/reopen, preference history/idempotency, cancellation/cross-case denial, cost subtotals, and database backup/restore including A3 snapshots/receipts/preferences. There are no stress/load or multi-process concurrency claims: SQLite serializes local writes; tested races are controlled stale-draft/revocation and duplicate-operation cases.

## Genuine failures, fixes and retests

1. `a3-first-tests.log`: 82/83 passed; foundation migration assertion expected schema 6, implementation correctly added schema 7. Updated expected schema and retained-record assertions. No old record was changed to make the test pass.
2. `a3-adversarial-before-fix.log`: 83/86 passed. Empty-source claims were accepted; repeated exact slot requests created another event; approved windows were included in a message but omitted from its disclosure list. Fixed nonempty evidence requirements, duplicate-slot rejection, and explicit declared-window scope plus execution checks. Regression pass recorded in `a3-regression-tests.log`.
3. `a3-integration-tests.log`: 89/90 passed; close/reopen test cleanup tried to close the original already-closed handle. Corrected test ownership/cleanup. Persistence assertions themselves had passed.
4. `a3-feedback-before-fix.log`: feedback could be recorded before a confirmed completed viewing. Added a state/time guard and disabled the UI control until the viewing is completed in demo time. Positive after-viewing and negative premature-report cases now pass.

Original logs remain unchanged. No scores or baseline failures were invented. Final acceptance reread checked contract/schema separation, consent execution gate, atomicity, exact-version routing, held research requests, followup budget, scheduling and source authority. No unresolved failure remains in the exercised deterministic suite.

## Actual Mac Chrome QA

Used the supported Chrome extension on the user's Mac at `http://127.0.0.1:3000/a3`.

- Selected Synthetic Six twice: one property, no consent, send disabled.
- Granted yes for that property only; sent the synthetic initial cost request while preferences were incomplete; recorded partial rent with other fees still unknown.
- Explicitly approved the December 23 New York 09:00–17:00 test window and 30+30 settings. Requested 10:00–10:30; verified requested status. Used the separately labeled exact simulated property confirmation; verified confirmed status.
- Reloaded, then stopped and restarted the actual Next server and reloaded again. Consent, preference version 1, cost evidence, property version 6, confirmation and committed-version A2 receipts persisted without replaying a send.
- At 390×844, screenshot inspected; viewport width and document width both 390. Reset viewport afterward. Desktop screenshot also inspected. Physical devices and screen-reader/formal accessibility audit NOT RUN.
- Selected Synthetic Ten; its send remained disabled with missing consent despite Six's approval.
- Explicitly advanced demo time twice and sent two followups; the third-send control became disabled and a noncallable checklist appeared.
- Recorded property clarification exhaustion, a synthetic Mia report with utilities unknown, and unresolved Mia clarification. Request displayed `recorded_not_dispatched`, normalized fields, zero calls/hops/spend. No A1 branch or A2 analysis executed.
- Local server and A3 tab retained for demonstration. A localhost URL requires this Mac and its running server.

## Limits / future gates

Actual LLM generation, extraction, multilingual quality, provider failures under real transport, live prompt-injection resistance, verified property sources, real email/calendar, human model scoring, paid evaluation, hosting, production auth and A2 analysis are NOT RUN. Mock injection tests prove only that the fixed local paths did not change authority. Synthetic property confirmation is a controlled fixture, not verified third-party correspondence.

The minimal preference form edits one date/window at a time; the server contract accepts multiple approved dates/windows. All dates shown are synthetic, explicitly approved demo entries. Scheduling tests cover the listed DST cases, not exhaustive worldwide timezone certification. Real provider retry/spend reconciliation is not implemented; local mock failures expose bounded manual recovery, and no transport can spend money. A1's declared output-token policy still requires a verified tokenizer/provider limit before any future paid transport.

No claim of production certification, guaranteed safety or actual-model competence is made.

## Four-defect acceptance correction

A subsequent read-only review found four gaps despite the earlier 93 passing tests. The earlier readiness statement is qualified by this correction. Preserved `verification/a3-four-gap-baseline.log` contains four genuine failing regression tests against the prior implementation.

1. Evidence-dependent send now rejects an empty evidence-reference array before any commit.
2. Revoking consent for a proposed/requested appointment writes cancellation, incremented record version and a material `appointment_status_changed` outbox event in the same transaction. Injected commit failure verifies rollback of both.
3. Currency and billing-period changes participate in semantic conflict/materiality comparison. Conflicting values remain visible. Known recurring subtotals include only explicitly USD/month claims; one-time/refundable subtotals require USD and an explicit one-time/upfront unit. Unsupported units/currencies remain excluded and listed for review; there is no invented currency conversion or billing normalization.
4. Demo-clock advance requires a valid full ISO timestamp with explicit offset, valid calendar date and hour, and a forward instant before commit. Date-only, offset-free, malformed, impossible-date and hour-24 values reject without corrupting state; report loading remains valid.

Final suite: **97 passed, 0 failed** = 33 mapped A3 + 14 additional A3 + 30 A1 + 10 foundation + 5 core + 5 legacy A3. Evidence: `a3-four-gap-final-tests.log`; lint/typecheck/build in `a3-four-gap-lint.log`, `a3-four-gap-typecheck.log`, `a3-four-gap-build.log`. `a3-four-gap-retest.log` records the first successful correction run. No invalid probes touched the saved demonstration database. No fixture dates were changed.
