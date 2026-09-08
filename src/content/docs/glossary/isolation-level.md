---
title: "Isolation level"
description: "A database concurrency setting that defines which effects of concurrent transactions may become visible to one another."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - databases
  - concurrency
related:
  - databases/isolation-levels-and-concurrency-anomalies
sources:
  - type: literature
    title: "A Critique of ANSI SQL Isolation Levels"
lastReviewed: "2026-09-08"
---

# Isolation level

An isolation level defines which interactions between concurrent database transactions the system permits or prevents.

Different levels trade concurrency and implementation cost against anomalies such as dirty reads, non-repeatable reads, or serialization failures.

Names such as read committed and serializable have database-specific details. Evaluate the actual guarantee, not only the label.
