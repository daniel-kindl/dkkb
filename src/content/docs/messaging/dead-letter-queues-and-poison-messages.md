---
title: Dead-letter queues and poison messages
description: Isolate repeatedly unprocessable messages without hiding permanent failures behind endless retries.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - messaging
  - dead-letter-queue
  - retries
related:
  - reliability/retries-and-exponential-backoff
  - problems/retry-storm
  - observability/actionable-alerts
  - messaging/delivery-semantics-and-idempotent-consumers
sources:
  - type: literature
    title: "Enterprise Integration Patterns"
    note: The Dead Letter Channel pattern isolates messages that cannot be delivered or processed normally.
lastReviewed: "2026-09-08"
---

# Dead-letter queues and poison messages

A poison message is a message that repeatedly fails normal processing because the failure is permanent or requires intervention.

A dead-letter queue or dead-letter channel moves such messages out of the main retry path so one bad input does not block or overload healthy work.

## Not every failure deserves dead-lettering

Transient dependency failure may deserve a bounded [retry](../glossary/retry.md) with [exponential backoff](../glossary/exponential-backoff.md).

Invalid schema, missing required business state, unsupported message version, or a deterministic handler defect may fail every retry until something changes.

A retry policy should therefore classify failures instead of treating every exception as transient.

## Preserve evidence

Dead-letter handling should keep enough information to diagnose and safely replay the message.

Useful evidence includes:

- original message identity and payload or a safe reference to it;
- source topic or queue;
- delivery and retry count;
- first and last failure time;
- failure category and normalized error data;
- consumer version where relevant;
- correlation identifiers.

Do not copy sensitive data into an unrestricted dead-letter store only for convenience.

## Avoid silent storage

A dead-letter queue is not a success state.

If messages accumulate without ownership, the system has converted an operational failure into hidden data loss.

Monitor dead-letter rate, age, and backlog. Define who investigates, when replay is safe, and when the message should be discarded according to policy.

## Replay is another delivery

A replayed message may target state that has changed since the original failure.

The handler should preserve normal idempotency and validation rules. Do not bypass safeguards only because an operator initiated the replay.

## Ordering considerations

Removing one failed message from an ordered stream can let later messages overtake it.

That may be correct for independent work and incorrect for workflows whose later steps depend on the failed event.

The dead-letter policy must therefore match the ordering and dependency model.

## Practical guidance

Use dead-lettering to bound repeated failure, not to avoid fixing consumers.

Classify permanent and transient failures, preserve diagnostic evidence, alert on accumulation, and define a safe replay or discard process before the queue becomes necessary.
