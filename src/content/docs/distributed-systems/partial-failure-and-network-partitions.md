---
title: Partial failure and network partitions
description: Treat communication failure and uncertainty as normal distributed-system conditions rather than exceptional local errors.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - distributed-systems
  - partial-failure
  - network-partitions
related:
  - reliability/timeouts
  - reliability/retries-and-exponential-backoff
  - concurrency/distributed-coordination-and-coordination-avoidance
  - distributed-systems/replication-quorums-and-consistency
sources:
  - type: literature
    title: "A Note on Distributed Computing"
    note: Waldo, Wyant, Wollrath, and Kendall explain why remote interactions cannot safely be treated like local object calls.
  - type: literature
    title: "Designing Data-Intensive Applications"
    note: Kleppmann describes network faults, partial failure, and the uncertainty created by asynchronous communication.
lastReviewed: "2026-09-08"
---

# Partial failure and network partitions

A distributed system can fail in parts while other parts continue to run.

One node can be healthy while another node is down. A link can fail in one direction. A request can reach its destination while the response is lost. A slow node can be indistinguishable from a failed node for a bounded observer.

This is [partial failure](../glossary/partial-failure.md).

## A network partition creates uncertainty

A [network partition](../glossary/network-partition.md) prevents some nodes from communicating while those nodes may still be running.

The important problem is not only missing packets. Each side lacks current evidence about the other side.

A caller that reaches a [timeout](../glossary/timeout.md) cannot infer that the remote operation did not happen. It knows only that the expected response did not arrive within the allowed time.

That uncertainty affects retries, ownership, failover, and state transitions.

## Local assumptions do not transfer

Inside one process, a failed function call usually has a clear control-flow result. Across a network, the caller can lose the response after the remote side has already committed the effect.

For example:

1. service A sends a request to service B;
2. service B commits the change;
3. the response is lost;
4. service A times out;
5. service A cannot know from the timeout alone whether the change happened.

A blind [retry](../glossary/retry.md) can duplicate the effect unless the operation is idempotent or carries a stable deduplication key.

## Design for uncertainty

Useful distributed boundaries make uncertainty explicit.

Typical techniques include:

- bounded timeouts instead of infinite waiting;
- idempotent operations for repeatable delivery;
- explicit request or operation identifiers;
- leases or epochs for temporary ownership;
- quorum or consensus when a shared decision truly requires coordination;
- reconciliation when temporary disagreement is acceptable;
- observability that distinguishes latency, timeout, rejection, and confirmed failure.

No single mechanism removes partial failure. Each mechanism defines what the system may safely conclude under uncertainty.

## Availability is a policy choice

During a partition, a system may continue serving some operations, reject operations that require unavailable coordination, or stop serving writes to protect stronger consistency guarantees.

The correct choice depends on the invariant.

A read-only cache may prefer availability and accept stale data. A uniqueness constraint or money movement may require a stronger coordination boundary.

## Practical guidance

Treat remote success, remote failure, and unknown outcome as different states.

Do not design a distributed workflow on the assumption that every timeout means failure or that every successful local step means the whole workflow completed.

Start from the invariant, decide what evidence is required to act safely, and choose the smallest coordination mechanism that provides that evidence.
