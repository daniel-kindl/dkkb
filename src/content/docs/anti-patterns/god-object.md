---
title: God object
description: A single object accumulates unrelated responsibilities and becomes a coordination point for too much of the system.
type: anti-pattern
status: draft
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - anti-patterns
  - cohesion
  - coupling
related: []
sources:
  - type: literature
    title: "AntiPatterns: Refactoring Software, Architectures, and Projects in Crisis"
    note: Describes recurring structural anti-patterns caused by concentrated responsibilities and poor decomposition.
lastReviewed: "2026-09-03"
---

# God object

A God Object owns or coordinates many responsibilities that change for unrelated reasons.

## Observable symptoms

Typical symptoms include:

- a class or module with many unrelated dependencies;
- frequent edits for unrelated features;
- broad access to system state;
- methods that belong to several distinct domains;
- tests that require extensive setup because almost everything is connected.

## Why it happens

Responsibilities often accumulate gradually. Adding one more method to an existing central object can appear cheaper than identifying a new boundary.

Shared state and convenience APIs can reinforce the concentration.

## Consequences

The object becomes a high-conflict change point. Small changes require broad context, and isolated tests become harder.

Because many features depend on the same object, refactoring it also becomes risky.

## Mitigation

Split responsibilities according to cohesive behavior and distinct change drivers. Move state and policy together when they form a real domain boundary.

Do not replace one large object with many tiny forwarding objects. The goal is stronger cohesion and clearer ownership, not a larger file count.

## When the label does not apply

A large object is not automatically a God Object. A cohesive compiler pass, parser, generated model, or data structure can legitimately contain substantial code if it has one focused responsibility.

## Sources

- William J. Brown, Raphael C. Malveau, Hays W. McCormick III, and Thomas J. Mowbray. *AntiPatterns: Refactoring Software, Architectures, and Projects in Crisis*. Wiley, 1998.
