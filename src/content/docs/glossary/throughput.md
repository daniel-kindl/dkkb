---
title: "Throughput"
description: "The amount of work a system completes per unit of time."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - performance
related:
  - performance/latency-vs-throughput
sources:
  - type: literature
    title: "Site Reliability Engineering: Monitoring Distributed Systems"
    url: "https://sre.google/sre-book/monitoring-distributed-systems/"
lastReviewed: "2026-09-08"
---

# Throughput

Throughput is the amount of useful work a system completes during a unit of time, such as requests per second or records per minute.

Higher throughput can come from batching, parallelism, or more capacity. Those changes can also increase queueing and per-item latency.

Throughput is different from latency. Measure both when evaluating a performance change.
