---
title: Split brain and partition recovery
description: Prevent isolated authorities from making conflicting decisions and recover deliberately after connectivity returns.
type: problem
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - distributed-systems
  - split-brain
  - failover
related:
  - distributed-systems/partial-failure-and-network-partitions
  - distributed-systems/leader-election-and-consensus
  - distributed-systems/replication-quorums-and-consistency
sources:
  - type: literature
    title: "In Search of an Understandable Consensus Algorithm (Extended Version)"
    url: https://raft.github.io/raft.pdf
    note: Raft uses terms and majority agreement to prevent stale leaders from committing conflicting log entries.
  - type: literature
    title: "Designing Data-Intensive Applications"
    note: Kleppmann discusses leader failover, split brain, fencing, and replication failure modes.
lastReviewed: "2026-09-08"
---

# Split brain and partition recovery

Split brain occurs when two isolated parts of a system both believe they hold authority that should be unique.

A common example is two nodes both acting as the primary writer after a network partition or unsafe failover.

The problem is not that the nodes are both alive. The problem is that the system allows both to make decisions that cannot safely coexist.

## How split brain appears

A typical sequence is:

1. node A is the current leader;
2. A becomes isolated from node B;
3. B cannot distinguish isolation from A's failure;
4. B promotes itself or another node;
5. A still accepts authoritative work;
6. both sides create state under conflicting authority.

Automatic failover without a safe authority transfer can create this failure quickly.

## Fencing stale authority

A robust design makes old authority rejectable.

Common mechanisms include:

- consensus-backed leader terms or epochs;
- leases with carefully defined expiry and clock assumptions;
- fencing tokens checked by the protected resource;
- quorum requirements that prevent both partition sides from obtaining authority;
- external coordination services with one well-defined ownership contract.

A fencing token is useful because the protected resource can compare authority versions. A stale actor cannot continue only because it still holds an old lock object in memory.

## Recovery is not only reconnection

When the partition heals, both sides may contain accepted work.

The recovery process must decide whether to:

- discard one side because it was never authoritative;
- replay valid operations onto the surviving history;
- merge state using domain rules;
- surface a conflict for manual resolution.

Simply choosing the newest wall-clock timestamp can lose valid data and can be unsafe when clocks differ.

## Detect and observe

Useful signals include:

- leadership or epoch changes;
- nodes accepting writes under stale epochs;
- quorum loss;
- replication divergence;
- conflicting versions;
- repeated failover and re-election.

Alerting only on node health can miss the stronger failure: two healthy nodes both acting as owner.

## Practical guidance

Define how authority is acquired, how stale authority is rejected, and how conflicting state is reconciled before enabling automatic failover.

If the resource cannot verify a fencing token or equivalent authority proof, treat failover as a correctness-sensitive operation rather than a simple availability switch.
