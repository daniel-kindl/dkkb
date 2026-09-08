---
title: Consumer groups, partitioning, and ordering
description: Scale message consumption by assigning ordered partitions while making the ordering boundary explicit.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - messaging
  - consumer-groups
  - partitioning
  - ordering
related:
  - concurrency/ordering-happens-before-and-visibility
  - messaging/queues-publish-subscribe-and-event-streams
  - messaging/delivery-semantics-and-idempotent-consumers
sources:
  - type: literature
    title: "Kafka: a Distributed Messaging System for Log Processing"
    note: The Kafka design uses partitions for ordered logs and consumer groups for parallel consumption.
  - type: literature
    title: "Designing Data-Intensive Applications"
    note: Kleppmann discusses partitioned logs, ordering boundaries, and consumer processing trade-offs.
lastReviewed: "2026-09-08"
---

# Consumer groups, partitioning, and ordering

A consumer group lets several consumer instances share one logical subscription.

The messaging system assigns work so group members can process different parts in parallel without every member receiving every record.

Partitioning defines where that parallelism and ordering apply.

## Ordering is usually scoped

A scalable stream rarely provides one total order across all records without a cost.

Instead, records are divided into partitions. Each partition can preserve one local order while different partitions progress independently.

If records for one entity must stay ordered, the producer can route that entity's records to the same partition using a stable partition key.

The key becomes part of the correctness model.

## More partitions increase parallel capacity

Independent partitions let several consumers process records concurrently.

More partitions can improve throughput, but they also increase metadata, rebalance work, and the number of ordering domains the application must understand.

A hot partition can remain a bottleneck even when the stream has many other idle partitions.

## Rebalancing changes ownership

When consumers join, leave, fail, or change capacity, partition ownership can move between group members.

A consumer must stop acting on a partition after its ownership is revoked. Work that overlaps a rebalance can otherwise be processed under stale ownership.

Checkpoint or offset updates also need a clear relationship to side effects. Recording progress before the side effect can lose work. Recording progress after the side effect can repeat work after failure.

## Global order is expensive

One global ordered stream can simplify reasoning but limits independent progress because all records share one sequencing boundary.

Before requiring total order, identify the invariant that needs it.

Many domains need order only per account, aggregate, resource, or workflow. Partitioning by that domain identity preserves the needed order while allowing unrelated work to proceed concurrently.

## Practical guidance

Define the ordering scope in domain terms.

Choose a partition key that keeps dependent events together and spreads unrelated work well enough for expected load.

Treat consumer-group ownership and offset progress as coordination state. Observe lag and rebalance frequency instead of assuming a running consumer means the group is keeping up.
