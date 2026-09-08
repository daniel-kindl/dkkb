---
title: "Timeout"
description: "A bound on how long an operation may wait before the caller stops treating the attempt as active."
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
  - reliability/timeouts
sources:
  - type: primary-source
    title: "Timeouts, retries, and backoff with jitter"
    url: "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/"
lastReviewed: "2026-09-08"
---

# Timeout

A timeout limits how long a caller waits for an operation before it treats that attempt as failed or indeterminate.

Timeouts prevent one stalled dependency from consuming resources indefinitely. They should fit inside the caller's larger deadline and recovery policy.

A timeout does not prove that the remote operation stopped. The remote side may still complete after the caller gives up.
