---
title: "Replica"
description: "A copy of data or service state maintained on another node to improve availability, locality, or read capacity."
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

# Replica

A replica is a maintained copy of data or service state on another node.

Replicas improve availability or locality only when the system also defines how updates propagate and what consistency clients can expect.
