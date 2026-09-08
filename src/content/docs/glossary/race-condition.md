---
title: "Race condition"
description: "A correctness defect in which the result depends on the relative timing or interleaving of concurrent operations."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - concurrency
  - correctness
related:
  - problems/race-condition
  - concurrency/concurrent-state-transitions-and-lost-updates
sources:
  - type: literature
    title: "The Art of Multiprocessor Programming"
lastReviewed: "2026-09-08"
---

# Race condition

A race condition exists when correct behavior depends on which concurrent operation happens first.

The failure comes from an unsafe interleaving, not from concurrency by itself. Lost updates, duplicate work, and invalid state transitions are common outcomes.

A data race is a more specific low-level condition in some memory models. The broader term race condition describes the correctness dependency on timing.
