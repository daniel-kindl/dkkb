---
title: "Publish/subscribe"
description: "A messaging model where one publication is delivered to multiple independent subscriptions."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - messaging
  - glossary
aliases:
  - "pub/sub"
  - "pub-sub"
related:
  - messaging/queues-publish-subscribe-and-event-streams
sources:
  - type: literature
    title: "Enterprise Integration Patterns"
lastReviewed: "2026-09-08"
---

# Publish/subscribe

Publish/subscribe sends one publication to multiple independent subscribers or subscriptions.

Each subscriber owns its own processing state, so one subscriber completing work does not imply that the others have processed the publication.
