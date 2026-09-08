---
title: Scaling, autoscaling, and capacity
description: Add or enlarge resources from measured demand while respecting bottlenecks, startup delay, and dependency limits.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - infrastructure
  - scaling
  - autoscaling
  - capacity
related:
  - performance/latency-vs-throughput
  - reliability/load-shedding-and-backpressure
  - observability/service-level-indicators-and-objectives
sources:
  - type: literature
    title: "Site Reliability Engineering"
    url: https://sre.google/sre-book/handling-overload/
    note: SRE overload guidance connects capacity, queueing, load shedding, and graceful degradation.
lastReviewed: "2026-09-08"
---

# Scaling, autoscaling, and capacity

Scaling changes available resources to meet workload demand.

Vertical scaling makes one instance larger. Horizontal scaling adds more instances or workers.

Autoscaling changes capacity automatically from observed signals and policy.

## Vertical scaling

Adding CPU, memory, storage, or I/O capacity to one machine can be operationally simple and preserves a single-instance architecture.

It has physical and provider limits, can create larger failure domains, and may require restart or replacement.

## Horizontal scaling

Adding instances can increase capacity when work can be distributed across them.

It also introduces coordination, load balancing, shared-state, cache, and consistency questions.

A service that depends on one serialized database write path will not scale linearly merely because more frontend instances are added.

## Autoscaling is a feedback loop

An autoscaler observes a signal, decides on desired capacity, and waits for new capacity to become useful.

That delay matters.

If demand rises faster than instances can start, the system still needs queues, admission control, or [load shedding](../glossary/load-shedding.md) to survive the gap.

Signals also need to represent saturation accurately. CPU can be useful for CPU-bound work, while queue depth, request concurrency, or custom service demand can fit other workloads better.

## Avoid oscillation

A feedback loop that reacts too aggressively can add and remove capacity repeatedly.

Cooldown periods, stabilization windows, minimum/maximum bounds, and separate scale-up/scale-down sensitivity can reduce oscillation.

These controls trade responsiveness for stability.

## Capacity includes dependencies

A service is not truly scaled if downstream databases, queues, APIs, or network paths cannot sustain the increased load.

Capacity planning must follow the end-to-end bottleneck.

## Practical guidance

Scale after identifying the constrained resource.

Use autoscaling to adapt within known safe bounds, not as a substitute for load limits or capacity testing. Measure startup time, saturation, queueing, dependency capacity, and cost together.
