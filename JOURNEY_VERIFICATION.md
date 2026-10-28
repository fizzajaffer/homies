# Local Astra journey checkpoint — 2026-10-25

## Outcome
One connected synthetic live-provider journey reached the requested endpoint: a simulated landlord counteroffer was interpreted by gpt-6-astra and a next-step recommendation was saved for Mia/the human reviewer review. This is a limited integration result, not production readiness, general prompt-injection resistance, legal-quality certification or an assertion that a home is secured.

Local URL: http://127.0.0.1:3000/journey. Select **Mia · synthetic case 5** (case ID `5f2adcf6-cd00-4c44-a0db-4010e80429c3`). Reload currently returns the selector to case 1; case 5's data remain saved. Server uses loopback only. No real research, messages, calendar actions, payments, signing, hosting or GitHub publishing occurred. Gmail tab was not touched.

## What actually ran
- Deterministic synthetic A1 options, live Astra research interpretation with a genuine read-only stdio MCP evidence call and Responses continuation using the original tool call ID. The MCP fixture is not real market research.
- Subset A and intent both, explicit property consent and availability; live coordination draft checked against the approved exact template. One simulated message, exact simulated property slot confirmation, no real delivery.
- Actual PDF and plain email bytes uploaded through the application's multipart endpoint, parsed locally, saved in SQLite, then supplied as text to Astra. Not native vision/OCR or preloaded extraction answers.
- `happy-live-extract-v1`: five exact source-bound terms extracted, independent validation passed. Synthetic test confirmation exercised in Chrome.
- `happy-live-draft-v1`: live public draft with source-confirmed terms and requested 2200 base/amenity waiver. Versioned test approval and clipboard-copy path exercised in Chrome; copy is not sent.
- Actual `synthetic-landlord-reply.eml` uploaded. `happy-live-reply-v1` extracted 2400 base +45 amenity for12months and correctly identified the resolved-water acknowledgment and unaddressed amenity concern.
- `happy-live-recommend-v1-1-scoped`: completed, validation passed, **human review pending**. Advises continued comparison rather than acceptance or move commitment. Checks: base concession200/month; amenity concession0; remaining base target gap200; gap closure50%; rent package2445,180 above2265 ceiling; unknown alternative costs prevent a complete affordability/ranking conclusion.
- Review acknowledgment exercised as the synthetic test actor, not the human reviewer's actual approval of writing or strategy. No acceptance/signing recorded.

The Health view shows7current conditions met and1incomplete because the newly uploaded reply invalidated the previously copied draft's approval. The earlier approval/copy remains in history; it must not be reused. Three historical failed executions remain visible. This is intentional transparency, not an all-green claim.

## Genuine failures, fixes and retests
1. Initial research validation rejected `market-policy` despite the MCP returning it. Fixed registration of actual MCP evidence IDs before output validation. Original failed run and response preserved; existing response independently revalidated without generation in `research-validation-repair-v1`. This is a validator repair, not a new model trial or writing-quality pass. Before/after evidence: `verification/journey-mcp-source-before.log`, `journey-mcp-source-after.log`, `journey-research-original-response.json`, `journey-research-revalidated.json`.
2. Next production PDF upload failed because the bundled PDF worker path was missing. Added `serverExternalPackages:['pdfjs-dist']` in `next.config.mjs`; rebuilt/restarted. Actual multipart PDF+email retest returned200. Evidence: `journey-multipart-upload.json`, `journey-multipart-upload-after.json`.
3. First recommendation emitted internal `a1-selection` as a citation and annotated scalar values. Validator rejected it. Preserved `journey-recommend-original-output.json`. Clarified exact scalar/citation instructions in prompt `mia-journey-live-v1.1`, retaining original text in `journey-contracts-live-v1.ts.txt`. Added independent negative regressions; no relaxation of source validation.
4. First repair attempt exceeded the conservative request byte envelope and stopped **before any API request**. Removed duplicated resolved cost histories from model context while retaining itemized costs/provenance/unknowns. Existing full-path test now asserts bounded comparison payload and preserved unknowns. Final affected recommendation rerun passed. Original failed rows remain.
5. Health copy condition could previously count coordination approval and showed stale budget-pending text. Now requires a copied landlord draft with current dependency; explicitly explains invalidated historical copy. Added assertions to the offline end-to-end case. Cost and key arithmetic are visible without opening raw logs.

## Verification actually completed
- **163/163 automated tests passed**:152retained baseline +11journey tests. Baseline includes existing foundation/A1/A2/A3/unified checks. These are not163live model tests.
-11journey tests cover actual PDF bytes/change-sensitive extraction, unsupported input rejection, independent nested source binding, reservation/uncertain hold, Responses continuation and usage, runtime MCP continuation/manual resume, actual outbound privacy canary projection, stale approval plus upload backup/restore, cancellation/late completion, full offline connected journey, and the real recommendation output defect.
- Full suite: `verification/journey-complete-tests.log`. Typecheck: `journey-envelope-typecheck.log`. Build: `journey-envelope-build.log`. Lint: `journey-complete-lint.log` —0errors,1nonblocking anonymous-default-export warning in next.config.mjs.
- Independent final saved-state/calculation assertions: `journey-final-assertions.json`. Full synthetic state: `journey-final-state.json`.
- Actual Mac Chrome render, approval/copy controls, simulated review acknowledgment, reload, case continuity and final result inspected. Desktop and390px phone-width screenshots saved; phone DOM scrollWidth390 equals viewport390. This is viewport QA, not real-device certification.
- Process restart retained5cases,3uploaded files, exact viewing, outputs, failures and costs. Zero-dispatch probe `happy-manual-resume-no-dispatch` became interrupted, required manual resume, then was stopped in Chrome. API request count remained8; no automatic spending or duplicate simulated message.
- Initial live research continuation already completed; restart with a *pending live paid request* was not deliberately tested. Mocked continuation restart and late-abort tests pass.

## Cost and credit
Eight actual Responses requests: research2, coordination1, extraction1, draft1, reply1, initial recommendation1, repaired recommendation1. No paid counting calls. One additional local recommendation attempt was blocked before dispatch.
Usage-based new generation cost **$0.308571**; invoice not independently reconciled. No new uncertain request holds or request in flight. Authorized incremental allowance6; wholejourney grant5.7614 remains conservatively reserved. Prior combined commitment13.4165898 includes prior unresolved counting holds, not all invoiced generation. Combined prior commitment plus this usage13.7251608; conservative prior commitment plus whole grant19.1779898, below25. No remaining reserve was silently converted to permission for unrelated tests.
Last read-only OpenAIcredit observation was10.80 before these calls; not reverified after completion. Credit is separate from authorization/holds. No top-up performed or required by this small completed run.

## Limitations and next review
- the human reviewer should review the actual recommendation and initial draft. The draft is factual and private-data scoped but includes a raw internal citation ID and is basic, not polished advocacy writing. No claim of general entailment or legal adequacy. The live focused journey prompt is not proof that all139preserved requirements or full original skill behaviors were live-tested.
- Alternative property costs remain unknown in this run; Astra correctly refuses to claim moving is cheaper. No sourced market comparison or exhaustive search was performed.
- Broad live adversarial/correction/revocation suite NOT RUN. Existing offline regressions cover these guards, but that is not live model capability evidence. No live legal retrieval, scanned PDF/images, MIME attachments, real sending/calendar or hosted auth.
- Browser file-picker usability **not verified**: ChatGPT Chromeextension reported its file-URL permission disabled. No setting changed or bypass attempted. Actual app multipart upload/extraction passed independently. User may manually choose synthetic files later from `tests/fixtures/journey/`:
  - `synthetic-renewal.pdf`
  - `synthetic-renewal-email.eml`
  - `synthetic-landlord-reply.eml`
  Absolute folder: `./tests/fixtures/journey`.
- PDF input limits: text-based,200KB,3pages; plainUTF-8email only. Uploaded bytes remain local; extracted synthetic text is transmitted to OpenAI. Responses continuation uses store:true; no hidden reasoning is shown/logged. Provider retention policy is not a local-only storage guarantee.
- Current UI is deliberately minimal; case selection resets on refresh, fields show defaults instead of repopulating saved viewing input values, while saved confirmed viewing persists. Improve before broader user testing. Raw execution details contain output messages and source facts, never hidden reasoning.
- Earlier blocked Library artifacts were not uploaded. No credential contents or private correspondence were put in logs or API payloads.

## Tenant-rights coverage in this run
No official legal source was retrieved or assessed for jurisdiction, building applicability, exceptions or conditional consequences. The retained A2 contract explicitly says `coverage:'inventory_only'`, `applicability:'unverified'`, `verifiedClaims:[]` (`src/a2/contracts.ts`), with mocked legal-risk escalation in `src/a2/mock-language-policy.ts` and guards in `src/a2/schema.ts`. The live journey here uses a smaller focused prompt and source-bound financial facts; those retained mock safeguards do not establish a proactive live tenant-rights research capability. The live output appropriately avoids invented legal claims, but proactive applicable-rights analysis and grounded conditional consequences remain unimplemented/unverified in this integration path. This is a substantive future capability gap, not merely prose polish.
