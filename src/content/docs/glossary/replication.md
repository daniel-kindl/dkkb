---
title: "Replication"
description: "The process of maintaining copies of data or state across multiple nodes."
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

# Replication

Replication maintains copies of data or state on multiple nodes.

Its design determines update propagation, failover behavior, stale-read risk, and the consistency guarantees visible to clients.
