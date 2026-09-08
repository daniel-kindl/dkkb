---
title: "Delivery semantics"
description: "The contract describing how message delivery behaves around retries, acknowledgement, failure, and possible duplicates or loss."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - messaging
  - glossary
related:
  - messaging/delivery-semantics-and-idempotent-consumers
sources:
  - type: literature
    title: "Designing Data-Intensive Applications"
lastReviewed: "2026-09-08"
---

# Delivery semantics

Delivery semantics describe what a messaging system promises about loss, retries, and duplicate delivery.

Names such as at-most-once, at-least-once, and exactly-once are meaningful only when the boundary and side effects covered by the guarantee are explicit.
