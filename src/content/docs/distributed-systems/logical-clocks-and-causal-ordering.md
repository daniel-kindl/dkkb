---
title: Logical clocks and causal ordering
description: Track ordering relationships between distributed events without assuming synchronized wall clocks define causality.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - distributed-systems
  - logical-clocks
  - causality
  - ordering
related:
  - concurrency/ordering-happens-before-and-visibility
  - distributed-systems/replication-quorums-and-consistency
  - distributed-systems/partial-failure-and-network-partitions
sources:
  - type: literature
    title: "Time, Clocks, and the Ordering of Events in a Distributed System"
    url: https://lamport.azurewebsites.net/pubs/time-clocks.pdf
    note: Lamport defines the happened-before relation and logical clocks for distributed event ordering.
lastReviewed: "2026-09-08"
---

# Logical clocks and causal ordering

Distributed nodes do not share one perfectly synchronized clock.

Even when wall clocks are synchronized closely, timestamps alone do not prove which event caused another event.

Logical clocks describe ordering relationships between events without depending on physical time accuracy.

## Happened-before

Lamport's happened-before relation captures causality through program order and message delivery.

If event A occurs before event B in one process, A happened before B. If A sends a message that B receives, A happened before B. The relation is transitive.

Events with no happened-before relationship are concurrent in this model.

Concurrency here means the system has no causal evidence that one event preceded the other. The events may still have different wall-clock timestamps.

## Lamport clocks

A Lamport clock assigns increasing logical numbers to events.

A process increments its counter as events occur. A message carries the sender's counter. The receiver advances its counter beyond both its local value and the received value.

If A happened before B, then A receives a lower Lamport timestamp than B.

The reverse is not guaranteed. A lower Lamport timestamp does not prove that A caused B.

## Richer causal metadata

Vector clocks and related version-vector schemes track more information about which participants contributed to a version.

They can distinguish some concurrent versions that a single scalar logical clock cannot distinguish.

The cost is larger metadata that grows with the participant model or requires another bounded representation.

## Why ordering matters

Causal information can help with:

- preserving dependent updates;
- identifying concurrent writes that require reconciliation;
- preventing an effect from appearing before its cause;
- debugging distributed event histories;
- reasoning about replicated state without trusting wall-clock order.

A system does not need causal ordering everywhere. Stronger ordering can add coordination, metadata, or latency.

## Practical guidance

Use wall-clock time for human time, expiration, and duration when that is the actual requirement.

Use logical or version ordering when correctness depends on the relationship between distributed events.

State whether an ordering field represents physical time, commit order, causal order, or only a deterministic tie-breaker. These are different guarantees.
