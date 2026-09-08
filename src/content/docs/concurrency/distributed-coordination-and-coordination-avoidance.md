---
title: Distributed coordination and coordination avoidance
description: Decide when independent nodes must coordinate to protect a shared invariant and when the design can remove that coordination requirement.
type: decision
status: reviewed
confidence: high
provenance:
  - literature
  - primary-source
  - derived-guidance
topics:
  - concurrency
  - distributed-systems
  - coordination
related:
  - concurrency/ordering-happens-before-and-visibility
  - reliability/idempotency
  - reliability/retries-and-exponential-backoff
  - architecture/event-driven-architecture
  - databases/transactions-and-consistency-boundaries
sources:
  - type: primary-source
    title: "The Chubby Lock Service for Loosely-Coupled Distributed Systems"
    url: "https://research.google/pubs/the-chubby-lock-service-for-loosely-coupled-distributed-systems/"
    note: Google describes a distributed lock service built on consensus and the operational problems it solves.
  - type: literature
    title: "Coordination Avoidance in Database Systems"
    url: "https://www.vldb.org/pvldb/vol8/p185-bailis.pdf"
    note: Bailis and coauthors study when application invariants can be preserved without synchronous coordination.
lastReviewed: "2026-09-08"
---

# Distributed coordination and coordination avoidance

Distributed coordination makes independent nodes agree on ownership, order, or state before they perform work that could conflict.

Coordination is justified when a shared invariant cannot be preserved through independent local decisions.

## Start with the invariant

Examples that can require coordination include:

- exactly one active owner for a non-shareable resource;
- a state transition that must have one accepted predecessor;
- a global sequence whose order affects correctness;
- a limit that several independent writers can exceed together.

Do not coordinate only because several nodes touch the same logical entity. The operations can be safe without coordination when they commute, use partitioned ownership, or tolerate later reconciliation.

## Options

### Avoid coordination

Change the model so independent actors cannot violate the invariant.

Techniques include:

- partitioning ownership by key;
- using unique operation identifiers and idempotent processing;
- making operations commutative when the domain permits it;
- accepting temporary divergence and reconciling later;
- allocating independent quotas or ranges instead of one global counter.

Coordination avoidance often improves availability and latency because work does not wait for a distributed agreement step.

### Coordinate explicitly

Use a protocol or service that provides the required ownership or ordering guarantee.

Examples include a consensus-backed leader, lease, lock service, or ordered log. The application must still define what the guarantee means when nodes pause, messages are delayed, or ownership changes.

### Centralize ownership

Route all transitions for one invariant through one logical owner.

This can simplify correctness and ordering. It can also create a throughput or availability boundary that needs failover and recovery semantics.

## Leases and stale owners

A lease gives ownership for a bounded period. A paused or partitioned owner can continue running after another node receives a newer lease unless the protected resource can reject stale owners.

Fencing tokens solve this class of problem by attaching a monotonically increasing ownership token to operations. The protected resource accepts only the newest valid token.

A lock service alone cannot make an external resource obey stale-owner rejection.

## Duplicate work

Distributed systems often retry after uncertain outcomes. Two workers can then perform the same logical work even when ownership normally appears exclusive.

Use [idempotency](/dkkb/reliability/idempotency/) for duplicate delivery. Do not require global coordination when a stable operation identifier can make duplicates harmless.

## Failure modes

Common failures include:

- treating a lease as permanent ownership;
- using wall-clock time as the only authority for lock validity;
- assuming a network timeout means the previous owner stopped;
- creating one global lock for independent work and introducing unnecessary contention;
- using distributed coordination to hide an unclear domain invariant;
- adding retries that create duplicate effects around a coordination failure.

## Trade-offs

Coordination adds network round trips, availability dependencies, operational state, and recovery complexity.

Avoiding coordination can require a different data model, explicit conflict semantics, or later reconciliation.

A central owner can simplify local reasoning but concentrates throughput and failover responsibility.

## Decision guidance

Coordinate when the invariant requires one accepted owner or order before work proceeds and no safer local design removes that need.

Avoid coordination when independent operations can preserve the invariant through partitioning, idempotency, commutativity, or explicit reconciliation.

Use the weakest coordination guarantee that preserves the actual invariant. Stronger global ordering is not a substitute for defining the conflict that matters.
