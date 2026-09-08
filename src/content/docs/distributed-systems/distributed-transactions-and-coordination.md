---
title: Distributed transactions and coordination
description: Protect invariants that span independent participants while making blocking, failure, and recovery costs explicit.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - distributed-systems
  - distributed-transactions
  - coordination
related:
  - databases/transactions-and-consistency-boundaries
  - concurrency/distributed-coordination-and-coordination-avoidance
  - reliability/idempotency
  - reliability/retries-and-exponential-backoff
  - distributed-systems/leader-election-and-consensus
sources:
  - type: literature
    title: "Transaction Processing: Concepts and Techniques"
    note: Gray and Reuter describe distributed transaction processing and two-phase commit.
  - type: literature
    title: "Consensus on Transaction Commit"
    note: Gray and Lamport compare transaction commit with consensus and describe failure implications.
lastReviewed: "2026-09-08"
---

# Distributed transactions and coordination

A local [transaction](../glossary/transaction.md) can protect an invariant inside one transactional resource.

A distributed transaction tries to coordinate one atomic outcome across independent participants that can fail or become unreachable at different times.

The hard part is not sending several writes. It is deciding what the system may safely conclude when some participants have prepared or committed and communication then fails.

## Two-phase commit

Classic two-phase commit separates preparation from the final decision.

In the prepare phase, the coordinator asks each participant whether it can commit. A prepared participant reserves enough state to commit later.

If all required participants prepare, the coordinator records and sends commit. Otherwise it sends abort.

This can provide an atomic commit decision across participants, but it adds coordination and can block progress when the coordinator or required communication is unavailable.

## Atomicity has an availability cost

A participant that has promised to commit cannot safely guess a different outcome only because the coordinator is temporarily unreachable.

This is why distributed atomic commit can reduce availability under failure.

Consensus-backed commit protocols can improve failure handling, but they do not make coordination free. The system still pays for agreement, replicated decision state, and network round trips.

## Often the invariant can be redesigned

Many workflows do not require one atomic transaction across every component.

Alternatives include:

- assigning one service or database as the owner of the invariant;
- storing an intent locally and publishing work asynchronously;
- using idempotent consumers and retries;
- using compensating actions where the domain supports reversal;
- accepting temporary inconsistency and reconciling later;
- changing the data model so independent parts can progress without one shared lock.

These approaches change the guarantee. They are not drop-in replacements for atomic commit.

## Sagas are workflows, not magic transactions

A saga-style workflow sequences local transactions and compensating actions.

Compensation is a new domain action. It may fail, may not restore the exact previous world state, and may be impossible for irreversible effects.

Use saga terminology only when the workflow and compensation semantics are defined explicitly.

## Practical guidance

Start by writing the invariant and its ownership boundary.

If one transactional owner can enforce it, prefer that simpler boundary. If several independent participants must agree before the system may expose success, use an established distributed commit or consensus mechanism and design for unavailable participants.

Do not hide distributed coordination behind a helper that makes several remote calls look like one local transaction.
