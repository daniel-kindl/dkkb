---
title: "Eventual consistency"
description: "A convergence guarantee where replicas can temporarily disagree but converge after updates stop and communication continues."
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

# Eventual consistency

Eventual consistency allows replicas to disagree temporarily and requires them to converge when no new updates occur and communication continues.

It does not define how stale a read may be, how conflicts are resolved, or how quickly convergence happens unless additional guarantees are specified.
