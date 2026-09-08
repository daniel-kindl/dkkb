---
title: "Retry"
description: "A repeated attempt of an operation after a failure that may be temporary."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - reliability
  - distributed-systems
related:
  - reliability/retries-and-exponential-backoff
sources:
  - type: primary-source
    title: "Timeouts, retries, and backoff with jitter"
    url: "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/"
lastReviewed: "2026-09-08"
---

# Retry

A retry is a new attempt to perform an operation after an earlier attempt failed or produced an uncertain result.

Retries can recover from transient faults, but every retry adds load and latency. Safe policies bound the attempt count, total time, and retryable failure classes.

Repeated side effects require idempotency or another duplicate-control mechanism.
