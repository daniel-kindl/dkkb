---
title: "Transactional outbox"
description: "A pattern that records an outbound message in the same local transaction as a state change, then publishes it asynchronously."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - messaging
  - glossary
aliases:
  - "outbox pattern"
related:
  - messaging/transactional-outbox-and-state-publication
sources:
  - type: literature
    title: "Microservices Patterns"
lastReviewed: "2026-09-08"
---

# Transactional outbox

A transactional outbox records the intent to publish a message in the same local transaction as the business state change.

A separate publisher later sends the outbox record, avoiding the gap where a database commit succeeds but an unrelated broker publish fails.
