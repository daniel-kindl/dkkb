---
title: "Feature flag"
description: "A runtime control that selects between behaviors without requiring a new deployment for each enable or disable decision."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
aliases:
  - "feature toggle"
topics:
  - delivery
  - release
related:
  - delivery/feature-flags-and-controlled-rollout
sources:
  - type: primary-source
    title: "Feature Toggles"
    url: "https://martinfowler.com/articles/feature-toggles.html"
lastReviewed: "2026-09-08"
---

# Feature flag

A feature flag is a runtime decision point that selects whether a behavior is enabled for a request, user, cohort, or environment.

Flags can separate deployment from release and support staged rollout, experiments, or operational kill switches.

Temporary flags create configuration and test debt. They need an owner, a removal condition, and a defined failure default.
