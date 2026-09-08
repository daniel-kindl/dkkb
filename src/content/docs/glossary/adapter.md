---
title: "Adapter"
description: "A boundary component that translates one interface or representation into another without changing the core caller contract."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - architecture
  - patterns
related:
  - patterns/adapter
  - architecture/ports-and-adapters
sources:
  - type: literature
    title: "Design Patterns: Elements of Reusable Object-Oriented Software"
lastReviewed: "2026-09-08"
---

# Adapter

An adapter translates between an interface expected by one part of a system and an incompatible interface provided by another.

It contains protocol, provider, or representation differences so the core caller does not depend directly on those details.

An adapter should translate at the boundary rather than leak provider-specific concepts into the domain.
