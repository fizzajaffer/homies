> Latest approved correction and policy evidence: see CORRECTIONS_VERIFICATION.md. Its results supersede earlier pending-policy and semantic-guard conclusions below; historical logs remain retained.

# A2 v0.3 first local checkpoint — verification

Scope: synthetic/mock-only local checkpoint. This is not the full A2 release, legal validation, Astra evaluation or production certification. No paid calls, extraction transport, real sending, live research, calendar access, hosting or credential changes.

## Source and prompt

Read the full materialized 54,621-byte DOCX at `../prds/a2-v03/A2_Demo_Review_Proposed_v0_1.docx`: Library `libfile_9d5e95ebaff48191b51c7a3121dcffb6`, version 2, content v0.3. Filename remains old. All runtime/output, 32 expected-only scenario descriptions and troubleshooting sections were read. Page rendering was not re-certified.

`src/a2/prompt.ts` matches the extracted SYSTEM text exactly, excluding only the page-layout heading “System Prompt Part Two”. `verification/a2-prompt-provenance.json` records successful equality and hashes. Stable prompt is separate from mutable runtime. Mock code does not execute a language model or prove prompt quality.

## Implemented

- `src/a2/{contracts,schema,math,mock,mock-language-policy,prompt}.ts`: typed runtime/output, independent nested structural validation, evidence references, restricted mock language, private/outgoing boundary, deterministic economics.
- `src/server/a2/service.ts`: SQLite state/history/operation IDs/runs/audit/receipts, exact-text approval with dependency hashes, manual-copy/send distinction, received reply, legal-risk pause, decision/signing gates, committed A3 snapshot consumption, held zero-budget requests. Draft and run pause commit atomically.
- Schema migration 8; explicit versioned fixture synchronization in `src/server/fixture-v03.ts` and `scripts/sync-a2-v03.ts`. New cases initialize current fixture metadata; existing cases preserve prior history.
- `/a2` and `/api/a2`: local-only review UI/API, confirmed mocked facts, private review, landlord draft, approval/copy/manual-send record, synthetic counter, incoming A3 updates, itemized costs and decisions. Foundation/A3 links updated. No A2 email tool.
- A1 saved dated findings/status are context; A3 exact committed partial costs retain units, origin, dates, conflicts and unknowns. Receipt is not automatic recommendation execution. No new research branch; requests remain recorded_not_dispatched with zero calls/hops/spend.
- One active run per case; 8 steps, one retry for the mock operation, two no-progress steps, 120-second deadline, 0 actual model requests/$0. Explicit advance/manual resume; no automatic reopening work.

## Final checks

`verification/a2-final-tests.log`: **122 passed, 0 failed**.

| Suite | Tests |
|---|---:|
| A1 corrected mock regressions | 30 |
| A3 v0.2 mapped requirements | 33 |
| Additional A3 v0.2 regressions | 14 |
| Foundation | 10 |
| Core legacy | 5 |
| Legacy A3 | 5 |
| A2 v0.3 scenario/integration tests | 16 |
| A2 independent acceptance probes | 9 |
| Total | 122 |

Thus 25 new A2-related tests, including one explicit A1 → A3 → A2 integration scenario; **not 122 A2 tests and not 32 complete A2 scenario evaluations**.

Final lint, typecheck and Next production build passed; logs: `a2-final-lint.log`, `a2-final-typecheck.log`, `a2-final-build.log` under `verification/`.

Actual supported Chrome on this Mac: rendered `/a2`; confirmed synthetic facts; explicitly advanced opening run; reviewed/approved/copied draft; reload preserved awaiting_sent_confirmation with no send; recorded synthetic counter and committed A3 v12; prior draft invalidated; restarted actual server during counter run; reload showed interrupted, no automatic step; explicit resume completed once; counter review retained after final rebuild/restart and closing/reopening tab. Desktop screenshot inspected. 390×844 viewport inspected with document scrollWidth=clientWidth=390; override reset. Not real-device or multi-browser certification. Manual-send/signing branches tested in isolated test databases, not falsely confirmed as real actions in the saved demo.

Final preview: http://127.0.0.1:3000/a2. Local server bound loopback only. Host must remain running; this is not external hosting or a launch-at-login service.

## Genuine failures and fixes

1. Baseline after approved fixture changes: 93/97. Four old fixture/schema expectations failed (`a2-fixture-baseline-tests.log`). Updated date/budget/schema assertions; adjusted ranking input to preserve test intent under new fee fixture. Existing A1 all-mandatory-fee filter semantics were not changed.
2. First A2 suite: 14/15 (`a2-first-tests.log`). Test wrongly expected a second version for already-current defaults. Added a genuine older-value migration test, verified old history retained and rerun idempotent.
3. Review probe: 6/7 (`a2-negative-probes-before-fix.log`). Expected invented outgoing sentence rejection; actual validator accepted prose while structured claims remained valid. Added independent restricted synthetic clause policy. Same negative probe now passes. This deliberately does not certify arbitrary LLM prose.
4. Generated `.next/types/routes.d 2.ts` duplicates caused typecheck errors twice. Original duplicates preserved under `verification/generated-type-duplicates/`; excluded only duplicate generated `* 2.ts` files from TypeScript. Canonical generated types remain checked. Origin of duplicate files uncertain; no source or saved data removed.

Code inspection also corrected A3 receipt SQL placeholder count, nullable amount coercion, unsupported counter acknowledgment, atomic draft/run commit, duplicate evidence IDs and fresh-case metadata before final acceptance. These are inspection fixes, not represented as failed model evaluations.

## Acceptance coverage and honest limits

- E01/E02: conflicting mocked extraction blocks. Actual PDF/OCR illegibility and conflicting real document deadlines NOT RUN.
- E03–E05: independent shape/reference/private-content controls, no applicable legal claims, source instruction mutation probe. Current law retrieval/applicability and live prompt-injection resistance NOT RUN.
- E06/E07: mocked opening, counter omission/observable terms, committed material A3 update invalidates approval and enters next runtime; passed.
- E08: pending/partial A3 activity remains unconfirmed; passed. E09 richer suitability/trade-off judgment and E10 nuanced nonlegal risk advice remain future model/strategy evaluations, not claimed passed.
- E11: explicit cost categories, unknowns, deposits separate, rent-package ceiling, net-pay and peak-energy arithmetic, comparator; passed. E12 generic uncertainty hold passed; low/mid/high estimate-flip decision engine NOT implemented or tested in this first checkpoint (no such estimate fixture supplied).
- E13–E18: changed input approval invalidation, copy not send, edited actual text/unknown wording, interrupted/manual resume, explicit signing; passed. Browser did not simulate an actual external sent message or actual signing.
- E19: duplicate/out-of-order committed snapshot receipt and cross-case isolation; passed. E20: held deduplicated request, no dispatch/loop; passed.
- E21/E22: deterministic recoverable operation, timeout, no progress, step bound, stop and zero actual spend; passed. Live transport failures/cancellation billing NOT RUN because there is no transport.
- E23/E24: decision stop and no scripted final outcome in runtime; passed.
- E25/E26/E27: deterministic movement, no guaranteed discount, friendly worsening terms; passed for guards only, not strategic intelligence.
- E28/E30: no repeated negotiation after decision and calm static status/no guarantee; not an evaluated conversational companion.
- E29/E31/E32: resolved water kept factual, legal-risk pause, sources retained, invented clause rejected. Legal issue spotting and litigation-quality writing NOT RUN.

The mock-language validator accepts only reviewed synthetic clauses. It does not require all future legitimate LLM prose to match a mock answer key; a future live adapter requires a separately evaluated grounding/policy boundary. Independent nested schema is distinct from deterministic semantic checks and mock construction.

## Fixture, storage and pending policy

Latest user clarification overrides v0.3 document budget wording: primary baseline is base+amenity $2,145; preferred below $2,245; primary ceiling $2,265. At supplied final terms, base increase $160 and rent-package increase $115 remain separate. Trash-inclusive $2,277 is not the primary ceiling. Other actual fees/utilities may be unknown and are not assumed equal across real properties.

Synthetic comparator uses explicitly approved $2,200 base+$12 trash, plus $1,200 nonrefundable = $27,744/12 months. Staying at supplied final terms is $27,264; calculated difference $480, never added to $4,620 negotiation savings. Final $2,260 and comparator outcomes appear in test-only inputs; not injected as current case facts or future runtime replies.

A1 still filters all mandatory recurring fees against its existing synchronized $2,277 fixture maximum. Changing A1 to a $2,265 base+amenity filter is a semantic policy change pending separate clarification; not silently implemented. New A3 date controls use Jan 7, 2027; historical confirmed viewing preferences/records are preserved, not relabeled as new research.

Pre-migration database+document backup: `../foundation-data/backups/backup-c6db9c7a2f64802f26d804e00c08e258`; details `verification/a2-pre-migration-backup.json`. Two original cases and original document retained. Isolated backup/restore test verifies A2 draft plus document bytes and retained cases. Data remains in `../foundation-data`, outside build/temp directories. No production multi-user auth/encryption certification; local single-user only. No PRDs edited.
