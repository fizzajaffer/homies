# Faculty-style local UI verification

## Delivered
- `/console`: Product Faculty Studio skin, case queue, five numbered stages (Input, Context/evidence, Decision, Output, Human review), renewal and external terms visible together, saved run selector, source details, progress and next actions. Existing approval/copy guards are reused. New model execution and advanced consent/upload controls remain in the linked original Journey routes; opening Console does not dispatch calls.
- `/evals`: saved expected/observed scenario results, automated validation separated from human Pass / Needs work / Fail and comments. Append-only review receipts bind run ID to SHA256 of the entire saved run snapshot (including prompt/result/evidence identity). Changed snapshots make reviews stale. UI verification receipts never count as human acceptance.
- Existing routes remain available, including foundation, journey, benchmark, A1/A2/A3 and unified case view. Foundation links to new Console/Evals. No system-test dashboard/history expansion added.

Read `DESIGN.md` and `starter/index.html` from the supplied Downloads/capstone-build-kit (1).zip. Copied the PF-DESIGN block exactly, set one Studio skin on html, and added token-based layouts. No grocery/Northstar example content, provider helper, external script or model settings copied. Exact block hash is in verification/faculty-ui/design-provenance.json.

## Implementation
New: src/components/studio-header.tsx; src/app/console/page.tsx; src/app/evals/page.tsx; src/app/api/evals/route.ts; src/server/eval-reviews.ts; tests/faculty-ui.test.ts; scripts/faculty-ui-fixture.mjs.
Changed: src/app/globals.css, layout.tsx, page.tsx; src/server/migrations.ts (schema13 adds eval_reviews only); tests/foundation.test.ts migration expectation.

## Verified
- 209/209 tests: 202 retained +7 UI/review regressions. Includes reopen persistence, duplicate operation conflict/idempotency, stale snapshot rejection, immutable review history, human versus UI-test separation, invalid/running/missing run rejection, Console control boundaries and Studio/Evals labels.
- Typecheck/build passed. Lint0 errors,1 pre-existing next.config.mjs anonymous-export warning.
- Genuine first-run failures retained: strip-only TypeScript parameter property incompatibility; React effect-state lint issue. Fixed, rerun. Logs in verification/faculty-ui.
- Actual Mac Chrome at1512px and390px: Console and Evals document width equals viewport width; no horizontal overflow. Five stages present. Phone Evals table stacks, status labels and review controls remain readable.
- Evals double-click saved one ui-test receipt, reloaded and persisted after server restart. Human scoreboard stayed0/0/0 with10 pending. This is not the human reviewer's verdict.
- Isolated QA case2b019909-09ce-40ee-914e-c3a873d25f7e, run faculty-ui-mock-draft-qa: deterministic explicitly labelled fixture, no model generation. Approval/copy tested via Chrome. Initial double-click produced two same-draft approval audit events in the isolated QA case; preserved, then fixed by disabling approval once that run is approved (no business-rule change). Clipboard contained expected synthetic draft; copied-not-sent status and approval persisted after restart. Original cases untouched.
- All12 baseline case5/case6 continuity checks unchanged; active prompt hashes unchanged. API call count remains24, cumulative usage-based integration cost$1.385024. No paid calls, real outreach, hosting or credentials changes.
- Backup before099ecb5d3eab962bd8982be5805037f5, after ID in final-state.json. SQLite integrity ok, schema13.

## Evidence
verification/faculty-ui/{tests,typecheck,lint,build}.log; prompt-before.sha256 and prompt-after.sha256; browser-measurements.json; design-provenance.json; final-state.json; console-desktop.png; console-mobile.png; evals-desktop.png; evals-mobile.png.

## Limits
Local single-user interface only; no hosted authentication or production certification. Existing prompts/agent/business rules unchanged. Historical old-prompt drafts remain subject to the original stale-version rejection. Human reviews are local records, not identity-authenticated attestations. Broader legal/writing/model quality gates remain open. Not all historical test artifacts have been imported; that expansion was expressly deferred. Real-device/multi-browser certification not run.

Final repeat-approval retest after rebuild/restart: Chrome reported Approve exact draft enabled=false and Copy approved draft enabled=true for the persisted approved mock fixture. Full209 tests, typecheck/build and lint reran successfully after the fix. Console restored to historical case6; temporary viewport reset. Existing duplicate QA events were retained as failure evidence, not erased.

## Cohesive Console correction — 2026-10-26

The Console now contains existing shortlist/intent, synthetic upload, property consent and viewing-window/slot controls, plus source-bound extraction confirmation and simulated coordination review. It uses the same API/service guards. Explicit capability preparation/continuation controls retain server reservations; none were executed during this UI work. No prompt or agent behavior changed.

A shared UI case-routing layer (`src/client/case-session.ts`, `src/components/case-link.tsx`) carries case identity through Console, Journey, A1, A2, A3, foundation and case routes. Incoming URL identity wins over obsolete per-route selections. Requests with mismatched case identity, stale pending payloads, late responses or simultaneous writes are rejected at the client boundary; existing server case ownership/version guards remain authoritative. This is local single-user routing safety, not authentication.

Backup before correction: backup-66adfc18024be478dd63d13f0717a880. All 12 case5/case6 baseline table hashes remain unchanged.

Checks: 211/211 tests pass (209 prior + two case-routing regression tests covering multiple assertions); typecheck/build pass; lint zero errors, one pre-existing next.config warning. Initial component syntax error was fixed before build; an obsolete source-inspection test forbidding even explicit start buttons failed and was updated to check explicit user controls and no effect-triggered start. Initial failing suite retained in cohesive-tests-before-fix.log.

Actual Chrome: isolated existing UI-test case retained through Console → A3 → A2 → foundation → Console, reload and server restart. Integrated mock shortlist preparation, selection/intent double-click, scoped consent, approved window, requested slot and exact simulated confirmation exercised. Reload showed confirmed 2027-01-07T10:00:00-05:00. No real outreach. Desktop width/scroll width 1512/1512; phone Console 390/390 with five stages; phone Evals 390/390. Internal screenshots saved; no uploads requested or performed.

Limits: browser file-picker upload and new extraction were not rerun in this correction; integrated control calls the retained multipart endpoint and displays its synthetic-only restrictions. No live model tests or quality re-evaluation. Existing source/consent/scheduling/domain regression tests ran. Invalid/mismatched cases and response races were tested with isolated client harnesses; not by tampering with user's browser storage. Existing legacy detailed comparison and history routes remain accessible with case identity. No system-test-history dashboard added.

Evidence: verification/faculty-ui/cohesive-{tests,lint,typecheck,build}.log, cohesive-state.json, cohesive-console-desktop.png, cohesive-evals-phone.png. Prompt artifact SHA256 unchanged: eb4d2479b4fe52b654d7c875fdef4aafbb48135bfa22656998c719ff42614dde.
