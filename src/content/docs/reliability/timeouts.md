---
title: Timeouts
description: Bound how long work may wait for a dependency so stalled operations do not consume resources indefinitely.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - reliability
  - latency
  - distributed-systems
related:
  - reliability/retries-and-exponential-backoff
  - reliability/circuit-breakers
  - reliability/load-shedding-and-backpressure
  - problems/retry-storm
sources:
  - type: primary-source
    title: "Timeouts, retries, and backoff with jitter"
    url: "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/"
    note: Amazon describes timeout selection, retry interaction, and the risk of excessive retry load.
  - type: literature
    title: "Site Reliability Engineering: Addressing Cascading Failures"
    url: "https://sre.google/sre-book/addressing-cascading-failures/"
    note: Google discusses deadlines, overload, and failure propagation in distributed systems.
lastReviewed: "2026-09-03"
---

# Timeouts

A timeout places a finite waiting boundary around an operation that may stall or become too slow to remain useful.

Without a timeout, callers can hold threads, connections, memory, queue slots, or other capacity while waiting for work that may never finish.

## Failure mode addressed

Network calls and cross-process operations can become slow without failing immediately.

If callers wait without a bound, one slow dependency can consume enough caller capacity to create a wider outage.

A timeout converts excessive waiting into an explicit failure that the caller can handle.

## How it works

A timeout defines how long a caller waits before it stops waiting for the operation.

Useful timeout boundaries can include:

- connection establishment;
- request or operation execution;
- queue waiting;
- a total end-to-end deadline across several calls.

The correct boundary depends on what resource must be protected and how much latency the user or upstream caller can tolerate.

:::caution[A timeout is not cancellation]
The caller can stop waiting while the remote operation continues. Design cancellation and side effects separately when abandoned work can still change state.
:::

## Important choices

Timeouts should be long enough for expected successful work but short enough to release capacity before waiting becomes harmful.

A fixed value copied across every dependency can be wrong because latency distributions and business deadlines differ.

For multi-step work, a total deadline can be more useful than giving each dependency a fresh full timeout. Each step then consumes part of one latency budget.

## Trade-offs and secondary failures

A timeout that is too high allows slow work to occupy resources for too long.

A timeout that is too low can reject healthy but slower requests. If callers immediately retry those requests, the timeout can increase downstream load.

Timeouts also create uncertainty for side-effecting operations. The caller may time out after the dependency committed the change but before the response arrived.

## Dangerous combinations

Timeouts combined with aggressive retries can create a retry storm through repeated attempts against a slow dependency.

A retry should therefore fit inside an overall deadline and remain bounded by attempt count or retry budget.

Side-effecting operations should also have an idempotency strategy before automatic retries are enabled.

## Observability

Measure at least:

- timeout count and rate;
- latency distributions near the timeout threshold;
- which operation phase timed out;
- downstream saturation at the same time;
- retry attempts triggered by timeouts;
- remaining deadline when a downstream call starts, when available.

A timeout metric without latency and saturation context cannot show whether the threshold is too low or the dependency is unhealthy.

## When a simpler mechanism is enough

An in-process operation with no blocking dependency may not need a separate timeout if its execution is already bounded by the caller's control flow.

Do not add independent timeout layers when an existing end-to-end deadline already protects the same resource and can be propagated correctly.

## Sources

- Amazon Web Services. "Timeouts, retries, and backoff with jitter."
- Google. *Site Reliability Engineering*, "Addressing Cascading Failures."
