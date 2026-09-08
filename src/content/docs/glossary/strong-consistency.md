---
title: "Strong consistency"
description: "A consistency guarantee under which completed writes are observed according to one defined global ordering or equivalent strong visibility rule."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - distributed-systems
  - glossary
related:
  - distributed-systems/replication-quorums-and-consistency
sources:
  - type: literature
    title: "Designing Data-Intensive Applications"
lastReviewed: "2026-09-08"
---

# Strong consistency

Strong consistency describes a family of guarantees that tightly constrain how clients can observe concurrent and completed updates.

The exact guarantee must be named precisely, such as linearizability, because stronger consistency usually requires more coordination than eventual convergence.
