---
title: "Poison message"
description: "A message that repeatedly fails processing because its content or required context is incompatible with the consumer."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - messaging
  - glossary
related:
  - messaging/dead-letter-queues-and-poison-messages
sources:
  - type: literature
    title: "Enterprise Integration Patterns"
lastReviewed: "2026-09-08"
---

# Poison message

A poison message repeatedly fails when a consumer processes it because the message or required context is incompatible with the processing path.

Unlimited retries can turn one poison message into an availability problem, so retry limits and dead-letter handling should make the failure explicit.
