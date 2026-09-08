---
title: "Health check"
description: "A targeted check that reports whether a component is ready or able to provide the service expected at a specific boundary."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
aliases:
  - "health probe"
topics:
  - reliability
  - observability
related:
  - observability/logs-metrics-and-traces
sources:
  - type: literature
    title: "Site Reliability Engineering: Monitoring Distributed Systems"
    url: "https://sre.google/sre-book/monitoring-distributed-systems/"
lastReviewed: "2026-09-08"
---

# Health check

A health check is a focused test that reports whether a component can provide the service expected at a defined boundary.

Different checks can answer different questions, such as whether a process is alive, ready for traffic, or able to reach a required dependency.

A shallow process check does not prove that an end-to-end user path is healthy.
