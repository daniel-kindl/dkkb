---
title: Retries and exponential backoff
description: Retry selected transient failures with bounded attempts, increasing delays, and jitter so recovery attempts do not become new load spikes.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - reliability
  - retries
  - distributed-systems
related:
  - reliability/timeouts
  - reliability/idempotency
  - reliability/circuit-breakers
  - reliability/load-shedding-and-backpressure
  - problems/retry-storm
  - problems/thundering-herd
sources:
  - type: primary-source
    title: "Timeouts, retries, and backoff with jitter"
    url: "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/"
    note: Amazon describes bounded retries, exponential backoff, jitter, and retry amplification across service layers.
  - type: primary-source
    title: "Exponential Backoff And Jitter"
    url: "https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/"
    note: Marc Brooker demonstrates why jitter reduces synchronized retry contention.
lastReviewed: "2026-09-03"
---

# Retries and exponential backoff

A retry repeats an operation after a failure that may be temporary.

Exponential backoff increases the delay between later attempts. Jitter adds randomness so many clients do not retry at the same instant.

Retries can improve success during short faults. They can also amplify an outage when they are applied without limits.

## Failure mode addressed

Some failures are transient. A connection can reset, a dependency can briefly reject work, or a distributed operation can fail before a healthy path becomes available.

Failing immediately exposes every short fault to the caller. Retrying gives the operation another chance when success is likely soon.

## How it works

A safe retry policy normally defines:

- which failures are retryable;
- the maximum number of attempts;
- delay growth between attempts;
- jitter to avoid synchronized retries;
- a maximum delay;
- an overall deadline or retry budget;
- whether the operation is safe to repeat.

Exponential backoff spaces later attempts farther apart. The exact formula matters less than keeping retries bounded and preventing synchronized bursts.

:::danger[Retries spend shared capacity]
Every retry is extra work. Do not retry indefinitely, at every call layer, or after failures that are permanent or unsafe to repeat.
:::

## Boundary choices

Prefer one deliberate retry owner in a layered call path when possible.

If several layers each perform multiple retries, one user operation can expand into many downstream attempts. This amplification is a common retry-storm mechanism.

Retries should also fit inside the caller's total deadline. An attempt that cannot finish before the deadline should not start only because retry count remains.

## Trade-offs and secondary failures

More retries can hide transient faults but increase latency and resource use.

Backoff reduces pressure but delays recovery for individual callers. Jitter improves population-level behavior while making exact retry timing less predictable.

A retry after an ambiguous timeout can repeat a side effect. Idempotency or another duplicate-suppression mechanism is required when repeated execution would be harmful.

## Dangerous combinations

Unbounded retries can prevent an unhealthy dependency from recovering.

Immediate retries from many clients can create a thundering herd. Backoff without jitter can still synchronize clients when they started at similar times.

Retries after load shedding can also defeat admission control if rejected callers return immediately with more attempts.

## Observability

Separate original requests from retry attempts.

Track:

- retries per logical operation;
- retry success rate;
- failures by retryable and non-retryable cause;
- delay before each attempt;
- total operation latency including retries;
- downstream saturation during retry bursts;
- operations that exhaust their retry budget.

A high final success rate can still hide expensive retry amplification.

## When a simpler mechanism is enough

Do not retry when the caller can safely surface the failure and let a higher-level workflow decide what to do.

A single immediate second attempt can be sufficient for a narrow, well-understood transient fault, but it should still be bounded and justified by evidence.

## Sources

- Amazon Web Services. "Timeouts, retries, and backoff with jitter."
- Marc Brooker. "Exponential Backoff And Jitter." Amazon Web Services, 2015.
