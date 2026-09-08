---
title: "Exactly-once delivery"
description: "A scoped guarantee that one logical effect is committed once despite retries, normally by coordinating delivery with processing state."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - messaging
  - glossary
aliases:
  - "exactly once"
related:
  - messaging/delivery-semantics-and-idempotent-consumers
sources:
  - type: primary-source
    title: "Apache Kafka design documentation"
    url: "https://kafka.apache.org/documentation/#semantics"
lastReviewed: "2026-09-08"
---

# Exactly-once delivery

Exactly-once delivery is a scoped guarantee that one logical processing effect is committed once despite retries or failures.

It is not a universal property of arbitrary external side effects; the exact transactional boundary covered by the guarantee must be stated.
