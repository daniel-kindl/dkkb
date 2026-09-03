---
title: Retry storm
description: Retries amplify an existing failure and create enough extra load to delay or prevent recovery.
type: problem
status: draft
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics: [reliability, retries, overload]
related:
  - reliability/retries-and-exponential-backoff
  - reliability/timeouts
  - reliability/idempotency
  - reliability/circuit-breakers
  - reliability/load-shedding-and-backpressure
sources:
  - type: primary-source
    title: "Timeouts, retries, and backoff with jitter"
    url: "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/"
lastReviewed: "2026-09-03"
---

# Retry storm

A retry storm occurs when failing or slow requests trigger enough retries to create additional load on an already unhealthy dependency.

```mermaid
flowchart LR
    Requests[Original requests] --> Dependency[Slow or failing dependency]
    Dependency --> Errors[Timeouts and errors]
    Errors --> Retries[Client retries]
    Retries --> Dependency
```

The feedback loop can keep the dependency overloaded after the original fault starts to recover.

## Symptoms

Request volume rises after errors begin. Recovery takes longer than expected, and several client layers can multiply one original request into many attempts.

## Detection

Measure original requests separately from retry attempts. Inspect retry counts across every layer in the call path and correlate them with saturation and timeout rates.

## Mitigation

Use bounded retries, exponential backoff, jitter, retry budgets, and explicit rules for which failures are safe to retry. Prefer one retry owner in a layered call path when possible.

Idempotency is required when a retry can repeat a side effect.

:::danger[Retries can amplify an outage]
Do not retry indefinitely or at every layer. A retry policy must bound attempts and load, and it must distinguish retryable failures from permanent or unsafe failures.
:::

## Trade-offs

Fewer retries can expose transient failures to callers. More retries can improve success during short faults but consume capacity needed for recovery.

## Sources

- Amazon Web Services. "Timeouts, retries, and backoff with jitter."
