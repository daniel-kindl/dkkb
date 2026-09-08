---
title: "Event stream"
description: "A retained ordered sequence of event records that consumers can read from tracked positions and often replay."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - messaging
  - glossary
aliases:
  - "event log"
related:
  - messaging/queues-publish-subscribe-and-event-streams
sources:
  - type: primary-source
    title: "Kafka: a Distributed Messaging System for Log Processing"
    url: "https://notes.stephenholiday.com/Kafka.pdf"
lastReviewed: "2026-09-08"
---

# Event stream

An event stream is a retained ordered sequence of records that consumers read from explicit positions.

Retention and replay distinguish a durable stream from a transient queue whose primary purpose is handing each message to a worker.
