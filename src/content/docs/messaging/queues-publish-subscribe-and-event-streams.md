---
title: Queues, publish-subscribe, and event streams
description: Choose an asynchronous communication model from ownership, fan-out, replay, ordering, and retention requirements.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - messaging
  - queues
  - publish-subscribe
  - event-streams
related:
  - architecture/event-driven-architecture
  - reliability/load-shedding-and-backpressure
  - messaging/delivery-semantics-and-idempotent-consumers
  - messaging/consumer-groups-partitioning-and-ordering
sources:
  - type: literature
    title: "Enterprise Integration Patterns"
    note: Hohpe and Woolf describe point-to-point channels, publish-subscribe channels, competing consumers, and durable messaging patterns.
  - type: literature
    title: "Kafka: a Distributed Messaging System for Log Processing"
    note: Kreps, Narkhede, and Rao describe a partitioned append-only log with retained data and consumer-controlled position.
lastReviewed: "2026-09-08"
---

# Queues, publish-subscribe, and event streams

Asynchronous messaging separates the producer's completion from the consumer's processing time.

The channel model determines who receives a message, whether several consumers share work, whether messages remain available for replay, and how ordering is represented.

## Queue

A queue normally represents work that one eligible consumer should process.

Several workers can compete for messages so the system can spread work across consumers.

The queue usually owns delivery state until the message is acknowledged, rejected, expired, or moved elsewhere.

This model fits commands and background work where duplicate fan-out is not the goal.

## Publish-subscribe

Publish-subscribe distributes one publication to several independent subscriptions.

Each subscription represents its own interest and delivery state. One subscriber completing its work does not mean another subscriber has processed the same publication.

This fits integration events when several downstream capabilities need to react independently.

## Event stream or log

A durable event stream retains ordered records for some period and lets consumers track their own position.

A consumer can process new records continuously and may be able to replay older records from a previous position.

This makes retention and consumer offsets part of the data model rather than only a transient delivery mechanism.

## Backpressure still matters

A broker can absorb temporary bursts, but it cannot remove unlimited load.

If producers continuously exceed consumer capacity, queue depth or consumer lag grows until a storage, latency, or retention limit is reached.

Use [backpressure](../glossary/backpressure.md), admission control, capacity scaling, or [load shedding](../glossary/load-shedding.md) where the system cannot safely buffer more work.

## Select from the contract

Use a queue when one logical worker should own each unit of work.

Use publish-subscribe when several independent consumers need the same publication.

Use retained event streams when replay, independent consumer positions, or a durable ordered history are first-class requirements.

Products often support several of these modes. Choose the semantic contract before choosing a broker feature.
