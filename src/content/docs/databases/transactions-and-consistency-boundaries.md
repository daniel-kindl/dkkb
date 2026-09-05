---
title: Transactions and consistency boundaries
description: Group operations so they commit as one atomic unit and preserve the invariants that define a valid database state.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - primary-source
  - derived-guidance
topics:
  - databases
  - transactions
  - correctness
  - concurrency
related:
  - databases/isolation-levels-and-concurrency-anomalies
  - databases/optimistic-vs-pessimistic-concurrency-control
  - reliability/idempotency
  - problems/race-condition
  - practices/safe-online-data-migrations
sources:
  - type: literature
    title: "Principles of Transaction-Oriented Database Recovery"
    note: Haerder and Reuter define the ACID properties (atomicity, consistency, isolation, durability) as the correctness contract of a transaction. ACM Computing Surveys, 1983.
  - type: literature
    title: "Transaction Processing: Concepts and Techniques"
    note: Gray and Reuter describe transactions, recovery, and the commit protocol in depth. Morgan Kaufmann, 1993.
  - type: primary-source
    title: "PostgreSQL Documentation: Transactions"
    url: "https://www.postgresql.org/docs/current/tutorial-transactions.html"
    note: PostgreSQL describes a transaction as a bundle of steps that either all take effect or none take effect.
lastReviewed: "2026-09-05"
---

# Transactions and consistency boundaries

A transaction groups a set of reads and writes so the database applies them as one unit. The unit either commits in full or leaves no partial effect.

The property being protected is an invariant: a rule that must hold for the stored data to be valid. Examples include a non-negative balance, a unique key, or a foreign-key reference that resolves.

## The ACID contract

The transaction correctness contract is often summarized as ACID.

- Atomicity: all writes in the transaction take effect, or none do.
- Consistency: a committed transaction moves the database from one valid state to another valid state, given the constraints the database enforces.
- Isolation: concurrent transactions do not expose intermediate state that would violate the agreed isolation level.
- Durability: once the database reports a commit, the effect survives a crash.

Consistency here means the database-level invariants that constraints and triggers enforce. It does not by itself guarantee that application logic is correct. The application still defines which state transitions make business sense.

## The mechanism at a product-neutral level

A transaction records its intended writes and does not make them final until commit.

On commit, the database makes the writes durable and visible as a unit. On rollback, or on a crash before commit, the database discards them.

Recovery uses a durable log so an interrupted transaction leaves no partial effect after restart.

Atomicity and durability rely on writing the intent to a log before the data pages become final.

This is the write-ahead principle: record what will change before you change it, so recovery can finish or undo the work.

## The consistency boundary

A consistency boundary is the set of data that one transaction can keep mutually consistent in a single atomic step.

Inside one boundary, the database can enforce an invariant across several rows or tables at once. Across boundaries, it cannot. Two separate transactions, two separate databases, or two separate services each define their own boundary.

Design the boundary around the invariant. If an invariant spans two rows that must change together, keep both writes in one transaction.

If an invariant spans two services, no single transaction covers it, and you must protect the invariant with another mechanism.

:::caution[Match the boundary to the invariant]
A transaction protects only the invariants inside its own boundary. Before you rely on a transaction, name the exact state transition that must stay atomic, then confirm all of its data is inside one boundary.
:::

## Trade-offs

A wide transaction that touches many rows holds locks or version state for longer. This raises contention, can reduce throughput, and can increase the chance of deadlock.

A narrow transaction reduces contention but cannot protect an invariant whose data falls outside it.

Longer transactions also delay when other transactions can observe the committed result, which affects latency for readers that need the new state.

Durability has a cost. A commit that must reach stable storage before it returns adds latency. Some systems allow relaxed durability for higher throughput, which trades a bounded risk of losing recent commits for speed.

## Common failure modes and misleading assumptions

- Assuming application code sees an all-or-nothing effect without an explicit transaction. Individual statements can each commit on their own, so a failure between them leaves partial state.
- Treating a successful commit as proof that the business rule is correct. The database enforces its declared constraints, not the intent behind them.
- Spanning an invariant across two systems and expecting one transaction to cover it. A local commit says nothing about a remote write.
- Holding a transaction open across a network call or user think-time. The transaction keeps its locks or version state while it waits, which starves other work.

## Interaction with application and distributed boundaries

Most single-node databases give strong transactional guarantees inside one database. A request that writes to a database and also calls another service crosses a boundary the local transaction cannot cover.

When an invariant must hold across services, teams commonly replace a single distributed transaction with other techniques.

Examples include an outbox that commits an event in the same transaction as the state change, idempotent handlers that tolerate retries, and a saga that reaches eventual consistency through compensating actions.

Each of these accepts weaker guarantees than one atomic transaction in exchange for availability and decoupling.

The idempotency and race condition entries cover making repeated delivery safe across such boundaries and the failures that appear when an invariant is not protected.

## When a full transaction is not needed

A single-statement write in most relational databases is already atomic on its own. A naturally idempotent operation may not need an explicit transaction to stay safe under retries.

Use an explicit transaction when several writes must succeed or fail together, or when a read and a dependent write must not be split by a concurrent change.

## Sources

- Theo Haerder and Andreas Reuter. "Principles of Transaction-Oriented Database Recovery." *ACM Computing Surveys*, 1983.
- Jim Gray and Andreas Reuter. *Transaction Processing: Concepts and Techniques*. Morgan Kaufmann, 1993.
- The PostgreSQL Global Development Group. "Transactions." *PostgreSQL Documentation*.
