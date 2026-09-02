---
title: Prefer composition over inheritance
description: Use composition as the default when behavior can vary independently from object identity.
type: principle
status: draft
confidence: medium
provenance:
  - literature
  - derived-guidance
topics:
  - object-oriented-design
  - coupling
  - extensibility
related: []
sources:
  - type: literature
    title: "Design Patterns: Elements of Reusable Object-Oriented Software"
    note: Describes object composition as a major technique for reusable object-oriented design.
lastReviewed: 2026-09-02
---

# Prefer composition over inheritance

Composition builds behavior by connecting objects with smaller responsibilities. Inheritance builds behavior through a parent and subtype relationship.

Prefer composition when behavior must vary independently, when several behaviors must be combined, or when inheritance would create a deep class hierarchy.

## Context

Inheritance can be simple when the subtype relationship is stable and meaningful. It becomes costly when subclasses exist mainly to reuse implementation or select behavior.

Composition makes dependencies explicit. It also lets a caller replace one behavior without changing the identity of the object that uses it.

## Trade-offs

Composition can introduce more objects, interfaces, and wiring. This cost is not justified when the behavior is small, fixed, and unlikely to vary.

Inheritance can remain the clearer design when the domain has a real subtype relationship and the inherited contract is stable.

## Failure mode

Do not replace every class relationship with an interface only to follow this principle. The goal is lower coupling and clearer behavior, not a larger number of abstractions.
