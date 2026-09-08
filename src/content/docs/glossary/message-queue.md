---
title: "Message queue"
description: "A messaging channel that buffers work so one eligible consumer can process each queued message asynchronously."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - messaging
  - glossary
related:
  - messaging/queues-publish-subscribe-and-event-streams
sources:
  - type: literature
    title: "Enterprise Integration Patterns"
lastReviewed: "2026-09-08"
---

# Message queue

A message queue buffers messages until an eligible consumer processes them.

Queues decouple producer timing from consumer timing, but backlog growth, redelivery, ordering, and acknowledgement semantics remain part of the contract.
