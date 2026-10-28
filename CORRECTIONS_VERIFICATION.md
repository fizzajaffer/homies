# A2 correctness fixes and approved A1 base-only discovery

This supersedes the pending A1 budget-policy note and earlier A2 semantic-guard acceptance conclusions in A1_VERIFICATION.md / A2_VERIFICATION.md. Historical evidence is retained.

## Final policy

A1 `a1-v0.6-base-discovery` uses confirmed advertised **regular base rent <= $2,265** for discovery. A separate evidence field establishes `regular_advertised`; net-effective, conditional-discount or unknown price bases cannot pass. Unknown/nonzero amenity or other mandatory fees do not independently exclude otherwise-qualified discovery candidates. Additional fees, unknowns, warnings, utilities and subtotal uncertainty remain visible; discovery fit is not affordability. All other location/unit/essential-feature/24-hour-staffing/date/PATH gates remain enforced. PATH counts use the same hard discovery filters; unknown additional fees are not hard-filter unknowns.

A2 retains the distinct **base+amenity** $2,265 primary ceiling; other mandatory charges/utilities remain separate comparison context. A $2,250 base + $45 amenity example passes A1 discovery but fails A2 rent-package fit. No real-property fee equality is assumed.

The original A1 SYSTEM prompt is preserved at `src/a1/history/prompt-v05.ts`; `src/a1/prompt.ts` is the explicit approved amendment. A2 SYSTEM text remains unchanged. File hashes: `verification/corrections-prompt-hashes.json`. Earlier extracted-text provenance remains in `verification/a2-prompt-provenance.json`.

## A2 changes

- Output contract `a2.output.v2` requires typed clause/source/version bindings and a private decision code. Independent schema rejects extra or malformed nested fields.
- Draft monetary/term mentions must equal current structured terms and confirmed renewal term. The renderer substitutes current values; a $2,210 target renders $2,210 rather than retaining $2,200. A one-month structured value cannot accompany a twelve-month body.
- Water/amenity clauses require their exact current confirmed synthetic evidence, matching source version and citation membership. Contradictory recurrence evidence is rejected. Outgoing claim metadata is source-bound factual content only; private inference cannot be smuggled into it.
- Private summary/action/status/progress/uncertainty fields are checked against independent controlled decision rules and current inputs. Unsupported legal guarantees are rejected in private recommendations, not just outgoing drafts.
- Already-sent drafts cannot be reapproved and resent under a different mode to overwrite actual sent text. Prior evidence/history remain intact. A separate correction/communication workflow is not added.
- `a2-semantic-v2` participates in dependency hashing, invalidating prior drafts for approval. Historical views remain readable.

These are narrow deterministic mock controls, not general language entailment, live prompt-injection resistance or Astra writing/legal quality.

## Tests and genuine failures

Final: **133 tests passed, 0 failed**, logged in `verification/corrections-final-tests.log`.

Prior suite: 122. Added 11 correction tests: **7 A2**, **2 A1**, **2 cross-agent policy/handoff tests**. The original 25 A2/integration tests remain included; do not describe all 133 as A2 tests.

- `approved-corrections-before.log`: six genuine failures before fixes (five A2 defect probes plus the initially proposed A1 alignment probe). The user then explicitly superseded base+amenity A1 filtering with base-only discovery; the test was updated to the latest authorized policy before implementation.
- `approved-corrections-a2-fixed.log`: five A2 defects passed; A1 still failed before its change.
- `corrections-regression-2.log`: 129/130; backup assertion expected 32 evidence records but the new explicit regular-price-basis field made 34. Corrected the expected count, preserving the failure log.
- `corrections-adversarial-before.log`: final probe found missing citation membership and private inference accepted in outgoing claim metadata. Both are now rejected by the retained regression.
- Relevant existing A1/A3/A2 orchestration, source conflicts, schema mutations, stale approvals, manual send, interruption, transaction rollback, backup and source-injection mocks reran as part of the full suite.
- Added cross-agent tests show an A1 discovery pass can exceed A2's rent-package ceiling and verify unknown A1 fees remain unknown in selected/consented A3 preparation and A2's saved A1 context. They do not execute new live research or real outreach.

Final lint, typecheck and production build passed: `verification/corrections-{lint,typecheck,build}.log`.

## Storage and Mac browser verification

Explicit migration script: `scripts/align-a1-discovery.ts`. Adds `baseDiscoveryCeiling=2265` via existing versioned repository updates; retains the old mandatory-fee field as historical context rather than reinterpreting its value. New A1 validation/prompt version invalidates old findings. Related A3 execution consent and A2 approvals require current versions.

Pre-change backup including original document: `../foundation-data/backups/backup-0e0785a5f2e8a9c40cdd84287d118b93`. Migration record: `verification/a1-base-discovery-migration.jsonl`. Original two cases, previous A1/A3 runs, documents and A2 drafts preserved. Search case versions advanced 7→8 and 3→4; no reset or startup rewrite.

Actual supported Chrome on the Mac:
- Old A2 reviews remained visible with disabled approval/copy after policy migration.
- A1 page displayed $2,265 advertised regular base discovery and historical v0.5 findings marked invalid.
- Explicitly executed S2 stages under v0.6: Synthetic A base $2,200 was discovery-eligible with additional mandatory costs and total unknown, visible warning and no verified live matches.
- Created corrected A2 counter review; stopped/restarted the actual local server after one saved step; reload required manual resume; one additional step produced review version 3, retaining versions 1–2.
- No actual sending/signing was recorded in the saved case for this verification. Actual-sent immutability tested in isolated temporary synthetic databases.

## Remaining limits

No paid model calls, real extraction, legal-source validation, external actions, hosting, credentials or PRD edits. Current model/live capability remains NOT RUN. Full E09/E10 strategy, E12 estimate-flip engine and conversational/legal quality remain outside the verified mocked checkpoint, as detailed in A2_VERIFICATION.md. Controlled private language and synthetic evidence bindings intentionally reject unsupported variants; broader model wording requires a separately evaluated boundary. Real-device/multi-browser certification remains untested.
