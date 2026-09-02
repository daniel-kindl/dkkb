# Repository governance

DKKB is maintained as a public source of truth. Process exists to protect content quality without adding unnecessary ceremony.

## Main branch

`main` must remain buildable and deployable.

The normal change path is branch, pull request, required checks, review, and squash merge.

## Merge policy

The intended repository settings are:

- require a pull request before merge
- require the main CI quality gate
- require resolved conversations
- require linear history
- block force pushes to `main`
- block deletion of `main`
- allow squash merge
- disable merge commits
- disable rebase merge
- delete head branches after merge

Repository settings must enforce these rules where GitHub supports them.

## Review policy

Knowledge review covers technical correctness, context, provenance, source quality, trade-offs, duplication, taxonomy placement, and writing quality.

Infrastructure review covers maintenance cost, security permissions, dependency cost, portability, and effect on free operation.

## Automation

Automation can enforce deterministic rules. It must not be treated as proof that a technical claim is correct.

Do not weaken a quality gate only because a proposed change fails it. Fix the change or justify and review the rule change separately.
