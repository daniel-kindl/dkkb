---
title: "At-most-once delivery"
description: "A delivery contract where a message is delivered no more than once, so failure can cause loss rather than redelivery."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - messaging
  - glossary
aliases:
  - "at most once"
related:
  - messaging/delivery-semantics-and-idempotent-consumers
sources:
  - type: literature
    title: "Designing Data-Intensive Applications"
lastReviewed: "2026-09-08"
---

# At-most-once delivery

At-most-once delivery avoids redelivering the same message after an uncertain failure.

The trade-off is possible message loss when acknowledgement or processing state cannot be confirmed.
