---
title: "Load balancer"
description: "A component that distributes requests or connections across multiple eligible service instances."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - networking
  - glossary
related:
  - networking/proxies-load-balancers-and-cdns
sources:
  - type: literature
    title: "Site Reliability Engineering: Load Balancing at the Frontend"
    url: "https://sre.google/sre-book/load-balancing-frontend/"
lastReviewed: "2026-09-08"
---

# Load balancer

A load balancer distributes incoming work across eligible service instances.

Its algorithm, health signals, locality rules, and retry behavior affect capacity utilization, fault isolation, and the traffic each backend actually receives.
