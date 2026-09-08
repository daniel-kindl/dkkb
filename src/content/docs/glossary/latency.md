---
title: "Latency"
description: "The elapsed time between starting an operation and observing its result."
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

# Latency

Latency is the elapsed time from the start of an operation until the relevant result is observed.

Latency is usually a distribution rather than one stable number. Percentiles such as p50, p95, and p99 show how typical and slow requests differ.

Latency is different from throughput. A system can finish individual requests quickly while completing little total work.
