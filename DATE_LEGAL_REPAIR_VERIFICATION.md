# Focused date-role and legal fallback repair — 2026-10-25

Completed local repair and three targeted synthetic Astra checks. This does not close the broader hosting/readiness gates.

## Changes
- `src/journey/evidence-dates.ts`: typed upload/recording/retrieval metadata; source statement/incident/effective bindings with exact quote, source ID and page. Explicit ISO labels and zoned plain email Date headers only. Ambiguous/invalid/missing dates remain unknown; conflicting labels remain visible and unresolved. Extraction is not authentication of the document or date.
- `src/journey/contracts.ts`: optional typed date-role metadata in evidence, retaining compatibility with historical records.
- `src/server/journey/service.ts`: actual provider source projection no longer assigns upload or property-recording time to statement date. Existing persisted originals are unchanged.
- `src/server/journey/legal.ts`: unavailable sources separated into access metadata; supporting source list excludes unavailable material. The no-source output schema requires zero claims. Existing exact nonempty quotation/source validation remains strict.
- `tests/date-legal-repair.test.ts`: 10 independent regression tests, including actual runtime projection and original-upload preservation.
- `scripts/date-legal-repair.mjs`: immutable inputs/results, conservative whole-suite budget check, three targeted calls, zero retries; records in existing benchmark evidence view.

No system/skill text or hashes changed. Approved artifact remains 16860 bytes, SHA-256 eb4d2479b4fe52b654d7c875fdef4aafbb48135bfa22656998c719ff42614dde. Active version mia-adaptive-v0.1. See matching prompt-before.sha256 and prompt-after.sha256.

## Verification
- 202/202 tests: 192 retained + 10 focused repair regressions. No skips/failures.
- Typecheck and production build passed. Lint zero errors, one pre-existing next.config.mjs anonymous-export warning.
- First typecheck exposed a TypeScript union-array inference mismatch; explicit Evidence[] annotation fixed it. First and passing logs retained.
- Original undated timestamp regression is independently rejected by the date-review validator. Original empty-quote/unavailable-source legal claim remains rejected. No original failed model output was rewritten or marked passed.
- Database quick_check=ok; all 12 case5/case6 baseline table checks unchanged. Backup before backup-e39571d91396c855909f345984570355; after backup-caca2409500e0e363b36a25865015f3c.

## Live targeted checks (not broad paired improvement)
1. repair-undated-v1: PASS, $0.019180. Statement date and quote null. Summary explicitly identifies uploadedAt as ingestion metadata, not statement time.
2. repair-source-dated-v1: PASS, $0.021730. Statement date 2026-10-20 with exact quote `Statement date: 2026-10-20`, source-dated:1, page1. Upload timestamp remains separate.
3. repair-legal-unavailable-v1: PASS, $0.049055. Claims empty. Explains inability to verify violation/compensation/withholding rights, requests chronology, lease/applicability checks and qualified advice. No legal quote invented.

Three calls, no retry; $0.089965 additional. Total integration24 calls/$1.385024; remaining incremental authority$4.614976. Prior committed ledger$13.416590; pooled remaining$10.198386. Zero unresolved holds/in-flight calls at23:55:17UTC. These are usage-based estimates, not invoice or account-credit reconciliation.

## Actual Mac Chrome QA
Supported extension recovered after opening a fresh local tab. No permission changes or bypass. Rebuilt loopback server restarted, still at http://127.0.0.1:3000.
- /journey: desktop1512/document1512; mobile390/document390. Readable Journey Health, expected/observed status, preserved case selector and cost/hold totals.
- /benchmark: desktop1512/document1512; mobile390/document390. Readable results and human-review labels. New targeted results persisted alongside original failure: eight distinct cases passed, one original failed, ten attempts total.
- Case5 selected read-only after restart: current offer2400+45, remaining base gap200, closure50%; original failures retained. UI selection is not itself guaranteed sticky across a reload; records are durable.
- Page reload and persisted benchmark results checked. Temporary viewport reset to desktop. No capability, approval, send or benchmark-run buttons clicked.
- `verification/date-legal-repair/ui-measurements.json`, journey screenshots and `benchmark-mobile-clip.png` provide evidence. The initial un-clipped benchmark mobile screenshot was scaled incorrectly by screenshot capture; use the explicit clipped image plus DOM geometry.

## Limits / remaining gates
This narrowly validates typed date extraction/projection and the no-source legal contract. It is not general semantic entailment, authentication of uploaded dates, general prompt-injection resistance or proof every free-text chronology claim is correct. Non-ISO/ambiguous dates, scanned PDFs and complex email formats still need human review; no silent timezone assumption. Legal live retrieval failures and applicability gaps remain. No new legal source retrieval was performed in these three checks; unavailable-source case is explicitly synthetic. Legal fallback helper is used by the focused legal request path; it is not a claim that a full autonomous legal workflow now exists.

Writing/strategy quality and human acceptance remain pending; broader adaptive scores remain mixed. No hosting, production authentication, real research/outreach/calendar/signing, private correspondence transmission or polished UI was added. Real-device/multi-browser certification not run. No claim that all six broader readiness gates passed.
