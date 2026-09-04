---
title: Latency vs throughput
description: Distinguish how long one operation takes from how much work a system completes over time, because optimizing one can worsen the other.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - literature
  - derived-guidance
topics:
  - performance
  - latency
  - throughput
related:
  - performance/caching
  - performance/bounded-work
  - performance/measure-before-optimizing
  - reliability/load-shedding-and-backpressure
sources:
  - type: primary-source
    title: "A Proof for the Queuing Formula: L = λW"
    note: John D. C. Little proves the relationship between the average number of items in a system, the arrival rate, and the average time an item spends in the system, known as Little's Law.
  - type: literature
    title: "Site Reliability Engineering: Monitoring Distributed Systems"
    url: "https://sre.google/sre-book/monitoring-distributed-systems/"
    note: Google presents latency, traffic, errors, and saturation as the four golden signals for monitoring a user-facing system.
lastReviewed: "2026-09-04"
---

# Latency vs throughput

Latency is how long one operation takes from request to response. Throughput is how much work a system completes per unit of time.

The two measures are related but distinct, and a change that improves one can reduce the other.

## Why the distinction matters

A system can have low latency and low throughput, such as a lightly loaded service that answers each request quickly but serves few clients.

A system can also have high throughput and high latency, such as a batch pipeline that processes a large volume of data with a long per-item delay.

Reporting only one measure hides the other. A dashboard that shows throughput alone can conceal that individual requests have become slower even as total volume holds steady.

## How they relate

Little's Law connects the two measures through concurrency: the average number of requests in a system equals the arrival rate multiplied by the average time each request spends in the system.

```mermaid
flowchart LR
    Arrivals[Requests arrive] --> InFlight[Requests in flight]
    InFlight --> Concurrency[Concurrency limit]
    Concurrency -->|Bounded| Complete[Requests complete]
    Complete -->|Latency observed| Arrivals
```

Raising concurrency can raise throughput up to the point where a resource saturates. Beyond that point, added concurrency increases queueing and latency without a matching gain in throughput.

## Common optimization traps

Batching multiple operations together can raise throughput by amortizing fixed cost, but it adds latency because early items in a batch wait for the batch to fill.

Adding worker threads or connections can raise throughput until a shared resource, such as a database connection pool or a CPU core, saturates. After that point, added concurrency mostly adds queueing delay.

Optimizing for the average latency can hide a growing tail. A system with an acceptable average and a severe 99th-percentile latency can still fail its slowest users.

:::caution[Report a distribution, not only an average]
Average latency can stay stable while tail latency grows. Track percentiles such as p50, p95, and p99 alongside throughput to see both the typical case and the worst case.
:::

## Trade-offs

Prioritizing throughput usually favors larger batches, higher concurrency, and shared queues, which increases per-item latency and variance.

Prioritizing latency usually favors smaller batches, bounded concurrency, and dedicated capacity, which can reduce the maximum sustainable throughput for the same resources.

The correct balance depends on the workload. An interactive user-facing request generally favors low latency. A background data pipeline generally favors high throughput.

## Failure modes

A queue that grows without bound converts throughput problems into latency problems, because waiting time in the queue dominates total response time.

Confusing the two measures during capacity planning can size a system correctly for peak throughput while leaving individual requests too slow, or the reverse.

Bounded concurrency and bounded queues keep throughput gains from silently degrading latency past an acceptable limit. Caching can reduce latency and raise throughput together when it removes expensive work from the common path.

## Sources

- John D. C. Little. "A Proof for the Queuing Formula: L = λW." *Operations Research*, vol. 9, no. 3, 1961.
- Google. *Site Reliability Engineering*, "Monitoring Distributed Systems."
