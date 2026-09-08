---
title: Delivery semantics and idempotent consumers
description: Separate broker delivery guarantees from application effects and make duplicate handling explicit.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - messaging
  - delivery-semantics
  - idempotency
related:
  - reliability/idempotency
  - reliability/retries-and-exponential-backoff
  - messaging/consumer-groups-partitioning-and-ordering
  - databases/transactions-and-consistency-boundaries
sources:
  - type: literature
    title: "Enterprise Integration Patterns"
    note: The Idempotent Receiver pattern addresses repeated message delivery at integration boundaries.
  - type: literature
    title: "Designing Data-Intensive Applications"
    note: Kleppmann discusses acknowledgement, redelivery, distributed commit, and exactly-once claims.
lastReviewed: "2026-09-08"
---

# Delivery semantics and idempotent consumers

Message delivery semantics describe what the transport may deliver. They do not automatically define how many times the application effect occurs.

This boundary matters because acknowledgement and application state changes can fail at different times.

## At-most-once

At-most-once delivery avoids redelivery after uncertain outcomes.

A message may therefore be lost if failure happens after the system considers delivery complete but before the application effect becomes durable.

This can be acceptable for disposable telemetry or replaceable updates where loss is cheaper than duplicate work.

## At-least-once

At-least-once delivery retries or redelivers until the system has sufficient evidence that processing completed.

This protects against message loss, but a consumer can receive the same logical message more than once.

The application must therefore make repeated processing safe where duplicate effects are unacceptable.

## Idempotent consumer

An idempotent consumer applies the same logical message more than once without creating additional unintended effects.

Common strategies include:

- storing a stable message or operation identifier;
- enforcing a uniqueness constraint at the state-change boundary;
- making the state transition itself naturally idempotent;
- recording consumption and state change in one local [transaction](../glossary/transaction.md) where possible.

The general [idempotency](../glossary/idempotency.md) entry covers the wider concept.

## Exactly-once needs a boundary

"Exactly once" is meaningful only when the system names the effect and the boundary that enforces it.

A broker may prevent duplicate stream-state updates inside one transaction, while an external email, payment, or HTTP call remains outside that transaction.

A transport guarantee cannot make an unrelated external side effect atomic automatically.

Use terms such as effectively-once only when the deduplication, transaction, or idempotency boundary is explicit.

## Acknowledgement timing

Acknowledging before the durable effect risks loss after a crash.

Acknowledging after the durable effect can cause redelivery if the effect succeeds but the acknowledgement is lost.

This is the fundamental reason at-least-once consumers often need idempotent application logic.

## Practical guidance

State both the delivery guarantee and the effect guarantee.

Prefer at-least-once delivery plus explicit idempotency when work must not be silently lost and duplicate delivery is operationally possible.

Do not claim exactly-once behavior across boundaries that are not part of one atomic protocol.
