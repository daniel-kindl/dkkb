---
title: Leader election and consensus
description: Establish one agreed decision or ordered history when independent nodes can fail and communication can be delayed.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - distributed-systems
  - leader-election
  - consensus
related:
  - distributed-systems/partial-failure-and-network-partitions
  - distributed-systems/replication-quorums-and-consistency
  - distributed-systems/split-brain-and-partition-recovery
  - concurrency/distributed-coordination-and-coordination-avoidance
sources:
  - type: literature
    title: "In Search of an Understandable Consensus Algorithm (Extended Version)"
    url: https://raft.github.io/raft.pdf
    note: Ongaro and Ousterhout describe leader election, replicated logs, terms, and majority-based commitment in Raft.
  - type: literature
    title: "The Part-Time Parliament"
    note: Lamport presents Paxos and the problem of reaching agreement despite failures.
lastReviewed: "2026-09-08"
---

# Leader election and consensus

Leader election chooses one node to act in a special role for a period of time.

Consensus is the broader problem of getting participating nodes to agree on a value or ordered sequence despite failures and delayed communication.

A leader can simplify consensus, but electing a leader safely is itself a coordination problem.

## Why a leader needs an epoch

A node cannot safely assume that it remains leader only because it has not heard otherwise.

A partition can isolate an old leader while another part of the system elects a new one. If both leaders can perform authoritative work, the system can create conflicting histories.

Consensus protocols therefore associate leadership with an epoch, term, ballot, or similar monotonically ordered identity.

Operations from an older epoch can be rejected once a newer epoch is known.

## Consensus is stronger than discovery

A service registry can report that several nodes appear alive. A health check can report that one node responded recently. Neither result proves that all relevant participants agree on one leader or one committed value.

Consensus requires rules for proposal, voting, ordering, and commitment.

Typical crash-fault consensus protocols require a majority of participants to make progress. This prevents two disjoint majorities from committing conflicting decisions at the same time.

## Safety and liveness

Two goals must be separated:

- **safety:** do not commit conflicting decisions;
- **liveness:** eventually make progress when conditions permit it.

A protocol may preserve safety during a partition by refusing writes when it cannot reach enough participants. This reduces availability but protects the committed history.

Timeout values influence how quickly nodes suspect a leader failure, but a timeout does not prove the leader is dead.

## Consensus is expensive coordination

Consensus adds network round trips, persistent metadata, failure handling, and operational complexity.

Use it when the system truly needs one authoritative decision, such as membership, lock ownership, a replicated command log, or metadata that cannot safely diverge.

Do not introduce consensus only to avoid designing mergeable or independently owned state.

The existing [distributed coordination guidance](../concurrency/distributed-coordination-and-coordination-avoidance.md) explains when coordination can be removed from the design instead.

## Practical guidance

Prefer an established consensus implementation over creating a custom protocol.

At application boundaries, reason about the guarantee you consume: committed order, lease ownership, configuration version, or elected authority. Do not treat "leader" as a permanent property of one machine.
