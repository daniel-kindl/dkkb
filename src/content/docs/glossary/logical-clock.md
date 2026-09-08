---
title: "Logical clock"
description: "A mechanism that assigns logical timestamps to events so systems can reason about ordering without relying on synchronized wall clocks."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - distributed-systems
  - glossary
related:
  - distributed-systems/logical-clocks-and-causal-ordering
sources:
  - type: primary-source
    title: "Time, Clocks, and the Ordering of Events in a Distributed System"
    url: "https://doi.org/10.1145/359545.359563"
lastReviewed: "2026-09-08"
---

# Logical clock

A logical clock assigns timestamps that represent event ordering rather than physical time.

Logical clocks help reason about causality and ordering when wall clocks are not sufficiently synchronized or meaningful for the required invariant.
