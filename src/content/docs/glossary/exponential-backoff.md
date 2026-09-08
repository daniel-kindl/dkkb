---
title: "Exponential backoff"
description: "A retry strategy that increases the delay between later attempts, usually with a maximum delay and jitter."
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

# Exponential backoff

Exponential backoff increases the delay between successive retry attempts, commonly by multiplying the previous delay by a fixed factor.

Backoff reduces repeated pressure on an unhealthy dependency and gives recovery time between attempts.

Production retry policies usually combine backoff with a maximum delay, bounded attempts, and jitter so many clients do not retry in lockstep.
