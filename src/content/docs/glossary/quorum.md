---
title: "Quorum"
description: "A minimum subset of participants whose responses or votes are required before a distributed operation can proceed."
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
  - distributed-systems/leader-election-and-consensus
sources:
  - type: literature
    title: "Designing Data-Intensive Applications"
lastReviewed: "2026-09-08"
---

# Quorum

A quorum is the minimum set of participants whose responses or votes are required for an operation or decision.

Quorum rules are useful only together with assumptions about membership, failures, and the consistency property the overlap is intended to protect.
