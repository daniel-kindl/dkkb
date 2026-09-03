---
title: Invert dependencies around policy
description: Keep high-level policy from depending directly on replaceable low-level implementation details when that separation has engineering value.
type: principle
status: draft
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - architecture
  - dependencies
  - coupling
related:
  - principles/composition-over-inheritance
sources:
  - type: literature
    title: "Agile Software Development: Principles, Patterns, and Practices"
    note: Robert C. Martin describes the Dependency Inversion Principle and dependency direction around abstractions.
lastReviewed: "2026-09-03"
---

# Invert dependencies around policy

High-level policy should not be forced to depend directly on a replaceable implementation detail when the system benefits from keeping those decisions independent.

Dependency inversion introduces a stable contract at the boundary. The policy and the implementation depend on that contract instead of the policy importing the implementation directly.

## Context

This principle is useful at boundaries such as persistence, external services, operating-system integration, delivery mechanisms, or algorithms with several valid implementations.

It is less useful when the dependency is simple, stable, and not expected to vary or require isolated testing.

## Benefits

A good inverted dependency can:

- keep policy independent from infrastructure choices;
- make replacement of an external mechanism more local;
- support isolated tests at a meaningful boundary;
- make architectural direction explicit.

## Trade-offs

The abstraction becomes another contract to design and maintain. A weak abstraction can leak the low-level API or grow methods for only one implementation.

Interfaces created only for ceremony add indirection without creating useful independence.

## Failure modes

Without an appropriate boundary, policy code can become coupled to database clients, HTTP libraries, cloud SDKs, or other implementation details.

With excessive inversion, every class can receive an interface even when there is no meaningful substitution or policy boundary.

## Practical guidance

Invert a dependency when the lower-level mechanism is a separate decision that the higher-level policy should not own. Keep direct dependencies when an abstraction would not reduce meaningful coupling.

## Sources

- Robert C. Martin. *Agile Software Development: Principles, Patterns, and Practices*. Prentice Hall, 2002.
