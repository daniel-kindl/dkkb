---
title: You aren't gonna need it
summary: Implement capabilities when there is evidence that they are needed, not only because they may be useful later.
description: Implement capabilities when there is evidence that they are needed, not only because they may be useful later.
type: principle
status: draft
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - simplicity
  - scope
  - design
related: []
sources:
  - type: primary-source
    title: "Yagni"
    url: "https://martinfowler.com/bliki/Yagni.html"
    note: Martin Fowler describes YAGNI as avoiding capability that is not currently needed.
lastReviewed: "2026-09-03"
---

# You aren't gonna need it

YAGNI means that a team should not build a capability only because it might be useful later.

Future requirements are uncertain. Extra capability creates code, tests, documentation, dependencies, migration obligations, and design constraints that must be maintained now.

## Context

YAGNI is useful when a proposed abstraction, extension point, feature, or infrastructure layer has no current requirement.

It does not mean ignoring known future constraints. Some decisions are expensive to reverse, and early preparation can be justified when evidence is strong.

:::caution[YAGNI does not ignore known constraints]
Do not use YAGNI to postpone work for a requirement that is already credible and expensive to retrofit. The principle targets speculative capability, not evidence-backed preparation.
:::

## Benefits

Deferring speculative work:

- keeps the current design smaller;
- reduces unused code and configuration;
- preserves more design freedom for the real requirement;
- moves cost closer to the time when value is known.

## Failure modes

Ignoring YAGNI can produce extension points that never receive a second implementation, generic systems with one use case, or infrastructure that adds operational cost without current value.

Over-applying YAGNI can also be harmful. A team can postpone necessary capacity, compatibility, security, or migration work even when the future constraint is already credible.

## Decision test

Before adding speculative capability, ask:

1. What current requirement needs it?
2. What evidence makes the future need likely?
3. What is the cost of adding it later?
4. What maintenance cost starts immediately if it is added now?

Prefer the smaller design when the need is uncertain and later change remains practical.

## Sources

- Martin Fowler. "Yagni."
