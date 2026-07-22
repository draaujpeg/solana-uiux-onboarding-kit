# Evals

Cases the skill has to get right, written so a failure is recognisable.

These are not automated. `npm test` at the repository root checks that the skill
is coherent: files exist, links resolve, nothing names a product. That has to
pass and it says nothing about whether the skill is any good. These cases say
what good means, and running them takes an agent with the skill installed and
somebody reading the answers.

Two files, testing two different things:

- [`trigger.md`](trigger.md) tests whether the skill is **chosen** at all, from
  its description, when a request arrives. Run it first: a skill that never fires
  is not worth grading on anything else.
- [`cases.md`](cases.md) tests what it **does** once chosen.

Run them after changing `SKILL.md`, after changing a reference, and before
publishing a version. Record what happened.

## What makes a case worth having

Most of these are cases where the skill should **decline**, propose less than it
was asked for, or ask before acting. Those are the ones a skill fails quietly:
producing a competent screen nobody needed reads as success, and nobody
reviewing the output would notice.

Cases where the skill builds the obvious thing are cheap to pass and cheap to
write. They are here to catch a regression, not to demonstrate competence.

## Reading a result

A case passes when the behaviour matches, not when the wording does. An agent
that refuses for a slightly different reason has passed. An agent that reaches
the right screen through no reasoning has not, because it will reach the wrong
one next time.

Where a case has a **trap**, that is the plausible wrong answer. If the skill
takes the trap, the fix is usually a reference that does not say enough rather
than a router that chose wrongly.
