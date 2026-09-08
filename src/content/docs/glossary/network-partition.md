---
title: "Network partition"
description: "A communication failure that prevents some nodes in a distributed system from exchanging messages while they may continue running."
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
    title: "Designing Data-Intensive Applications"
lastReviewed: "2026-09-08"
---

# Network partition

A network partition is a communication failure that separates some nodes from others while the separated nodes may continue to execute.

The key engineering consequence is uncertainty: a node cannot infer from missing communication alone whether another node failed, is slow, or is merely unreachable.
