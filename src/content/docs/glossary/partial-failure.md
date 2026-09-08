---
title: "Partial failure"
description: "A distributed-system condition where one component or communication path fails while other parts continue operating."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - distributed-systems
  - glossary
related:
  - distributed-systems/partial-failure-and-network-partitions
sources:
  - type: literature
    title: "A Note on Distributed Computing"
lastReviewed: "2026-09-08"
---

# Partial failure

Partial failure occurs when one part of a distributed system fails while other parts remain available.

Unlike a local all-or-nothing failure, partial failure leaves surviving components with incomplete evidence about remote state and outcomes.
