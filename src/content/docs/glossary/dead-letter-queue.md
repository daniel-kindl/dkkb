---
title: "Dead-letter queue"
description: "A holding queue for messages that could not be processed successfully under the normal delivery policy."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - messaging
  - glossary
aliases:
  - "DLQ"
  - "dead letter queue"
related:
  - messaging/dead-letter-queues-and-poison-messages
sources:
  - type: literature
    title: "Enterprise Integration Patterns"
lastReviewed: "2026-09-08"
---

# Dead-letter queue

A dead-letter queue, or DLQ, stores messages that the normal processing path has stopped retrying.

It preserves evidence for diagnosis or controlled recovery, but it does not by itself repair poison messages or guarantee eventual processing.
