---
title: "At-least-once delivery"
description: "A delivery contract that retries unconfirmed work, allowing duplicate delivery so messages are not silently lost after transient failure."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - messaging
  - glossary
aliases:
  - "at least once"
related:
  - messaging/delivery-semantics-and-idempotent-consumers
sources:
  - type: literature
    title: "Designing Data-Intensive Applications"
lastReviewed: "2026-09-08"
---

# At-least-once delivery

At-least-once delivery retries work whose completion is not confirmed.

It improves resistance to message loss but requires consumers to tolerate duplicates, commonly through idempotency or deduplication.
