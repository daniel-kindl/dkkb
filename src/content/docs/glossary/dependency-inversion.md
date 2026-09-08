---
title: "Dependency inversion"
description: "The design principle that high-level policy should depend on abstractions rather than concrete low-level implementation details."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - architecture
  - principles
related:
  - principles/dependency-inversion
  - architecture/architecture-boundaries-and-dependency-direction
sources:
  - type: literature
    title: "Agile Software Development: Principles, Patterns, and Practices"
lastReviewed: "2026-09-08"
---

# Dependency inversion

Dependency inversion is the principle that high-level policy should depend on stable abstractions instead of directly depending on low-level implementation details.

The implementation then depends on the abstraction required by the policy boundary.

This direction lets infrastructure vary without forcing the core policy to know provider or framework details.
