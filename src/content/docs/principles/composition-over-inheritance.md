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
related:
  - patterns/strategy
  - principles/dependency-inversion
sources:
  - type: literature
    title: "Design Patterns: Elements of Reusable Object-Oriented Software"
    note: Describes object composition as a major technique for reusable object-oriented design.
lastReviewed: "2026-09-02"
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

A deep inheritance hierarchy can couple unrelated concerns. A change to a base class can affect subclasses that were not part of the original change.

Composition can fail in a different way. Too many small abstractions can make a simple flow difficult to follow.

## When to use composition

Use composition when:

- behavior varies independently from the object that uses it;
- several behaviors must be combined;
- callers need to replace a dependency;
- inheritance would exist mainly for code reuse.

## When inheritance can be clearer

Inheritance can be suitable when:

- the subtype relationship is real and stable;
- callers can safely use the subtype anywhere the parent is expected;
- shared behavior belongs to the inherited contract;
- the hierarchy stays shallow and understandable.

## Practical default

Prefer composition as a default design tool. Do not replace a simple and valid subtype relationship with extra abstractions only to avoid inheritance.

## Sources

- Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides. *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley, 1994.
