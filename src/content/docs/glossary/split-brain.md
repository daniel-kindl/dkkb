---
title: "Split brain"
description: "A failure condition where separated parts of a distributed system both act as if they hold the same exclusive authority."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - distributed-systems
  - glossary
related:
  - distributed-systems/split-brain-and-partition-recovery
sources:
  - type: literature
    title: "Designing Data-Intensive Applications"
lastReviewed: "2026-09-08"
---

# Split brain

Split brain occurs when separated participants both act as if they hold an authority that should be exclusive.

It can cause conflicting writes or duplicated side effects unless fencing, quorum, epochs, or another ownership mechanism rejects stale authority.
