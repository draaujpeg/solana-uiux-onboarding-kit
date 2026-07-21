# Component specs

Written specifications for the 26 component frames, one file per pattern family. They exist so the
components can be built in code without opening Figma: layout, verbatim copy with proposed English
translations, interactive elements, icons, design tokens, inferred React props, and known defects.

Each file maps to one folder of PNG exports in [`../components/`](../components/).

| Spec | Pattern | Frames |
|---|---|:---:|
| [01-seed-phrase-education.md](01-seed-phrase-education.md) | Seed phrase education (flow) | 4 |
| [02-post-onboarding.md](02-post-onboarding.md) | Post-onboarding welcome states | 2 |
| [03-04-help-and-glossary.md](03-04-help-and-glossary.md) | Inline contextual help + inline glossary | 3 |
| [05-actionable-errors.md](05-actionable-errors.md) | Actionable error messages | 8 |
| [06-gate-anticipation-kyc.md](06-gate-anticipation-kyc.md) | Gate anticipation / KYC (flow) | 4 |
| [07-pre-action-confirmation.md](07-pre-action-confirmation.md) | Pre-action confirmation (risk templates) | 5 |

## Where the data came from

Two sources: the Figma file read through the Figma MCP server, and the committed PNG exports.
The Figma account is on the Starter plan, which caps MCP tool calls, and the cap was reached partway
through. Specs written after that point fall back to the PNG exports, which are reliable for copy,
structure, icons, states and relative colour, but give measured pixels instead of token names.

Each file states its own source at the top. Summary:

| Spec | Figma metadata | Token names |
|---|---|---|
| 01 | full (3 of 4 frames) | complete except frame `67:553` |
| 02 | full | complete |
| 03-04 | 1 of 3 frames | partial |
| 05 | none, PNG only | missing, observed values recorded instead |
| 06 | none, PNG only | missing, observed values recorded instead |
| 07 | none, PNG only | missing, inferred names marked as hypotheses |

The gaps are not blocking. Components adapt to the host project's brand rather than reproducing SDS
values literally, so what matters is the semantic mapping, not every variable name. Re-run
`get_variable_defs` when quota allows, mainly to confirm the success green and error red.

## Decisions that supersede these specs

The specs describe the design as it was read. Decisions taken afterwards win where they conflict, and
they all live in [`../decisions.md`](../decisions.md), which is the rule of record for building the
components. The headline ones:

1. Icon family is Lucide. Corrections: KYC alert uses `file-x`, slippage alert uses `trending-down`,
   wallet-not-connected uses `unplug`, the critical confirmation header uses `shield-off`. Callouts
   standardise on `alert-triangle` for warning and danger, `info` for neutral.
2. The destructive primary button is red at high and critical risk. Today every rung uses the same
   dark neutral button.
3. The recovery phrase renders blurred and reveals on click. There is never a copy-to-clipboard
   control: clipboard sniffing is a real theft vector, so its absence is a rule, not an omission.
4. The slippage alert no longer carries the expected-price versus current-price table. The export in
   `../components/05-actionable-errors/alert-slippage-exceeded.png` is already updated. Spec 05 Part B
   still describes the old table.
5. The four confirmation screens are risk templates, not a sequence. Risk level selects the template;
   the blocks (summary table, consequence list, type-to-confirm field) are content driven and combine
   freely on top of any template. Spec 07 Part A reads the non-cumulative structure as a defect; it is
   not, it is an undocumented rule.
6. Risk classification: low is reversible or low value, medium moves value with a variable outcome,
   high removes or destroys something that can be redone without the seed, critical touches a key or a
   permission **or can only be undone with the 12 words**. Escalate one level when the amount is a
   large share of the balance, when the destination address has never been used, or when nothing
   anywhere offers an undo. Under this rule the "Fechar esta conta?" frame is critical, not high, and
   needs the consequence list and the type-to-confirm field together.
7. The two post-onboarding states are templates. The fixed part is the structure, a welcome plus three
   next steps so nobody is stranded after connecting or creating a wallet. The copy varies per product:
   the skill proposes it and the user confirms, edits or picks an alternative. This applies to every
   component that carries product text.
8. Components ship in English. The Figma copy is Portuguese and is translated, not kept.

## Still open

Collected across all six specs, to be resolved before the components are written:

- The updated slippage export still shows the chain-link icon and a red dismiss X on an amber alert.
- The timeout alert tells the user to check their history but offers no action that opens it.
- The secondary button is a ghost on some frames and a filled grey on others.
- Confirmation titles alternate between questions and statements.
- No modal has a close control or an Esc path, and KYC step 3 has no exit at all.
- Missing states across the whole set: upload with a file selected, upload error, hover, focus,
  loading, and any narrow or mobile breakpoint.
- Modal widths come in four sizes (400, 440, 600, 640) and need one scale.
- Word 9 of the sample phrase reads `silve`, which is not a BIP-39 word.
- The tooltip component default says "Entender mais" while every instance renders "Entenda mais".
- Em dashes appear throughout the Portuguese copy, against the repository's own convention.
