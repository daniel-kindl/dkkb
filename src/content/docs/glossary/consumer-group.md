---
title: "Consumer group"
description: "A set of cooperating consumers that divide partitions or messages so work can be processed in parallel under one logical subscription."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - messaging
  - glossary
related:
  - messaging/consumer-groups-partitioning-and-ordering
sources:
  - type: primary-source
    title: "Apache Kafka consumer configuration"
    url: "https://kafka.apache.org/documentation/#consumerconfigs"
lastReviewed: "2026-09-08"
---

# Consumer group

A consumer group is a set of consumers that cooperate as one logical subscriber and divide eligible work among group members.

Group membership affects parallelism and ownership; ordering guarantees usually remain bounded to the partition or unit assigned to one consumer at a time.
