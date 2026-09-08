---
title: "Causal ordering"
description: "An ordering relation that preserves the happens-before relationship between events that can have influenced one another."
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

# Causal ordering

Causal ordering preserves the order of events when one event could have influenced another.

Independent concurrent events need not have one meaningful causal order, so imposing a total order can add coordination that the application does not require.
