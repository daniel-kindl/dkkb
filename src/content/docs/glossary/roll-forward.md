---
title: "Roll-forward"
description: "The recovery action of deploying a corrective change instead of restoring a previous version."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
aliases:
  - "roll forward"
topics:
  - delivery
  - recovery
related:
  - delivery/rollback-roll-forward-and-release-verification
sources:
  - type: literature
    title: "Site Reliability Engineering: Release Engineering"
    url: "https://sre.google/sre-book/release-engineering/"
lastReviewed: "2026-09-08"
---

# Roll-forward

Roll-forward repairs a faulty production state by deploying a new corrective change rather than restoring the previous release.

It is often required when a migration, contract change, or external side effect makes the old version incompatible with current state.

Roll-forward depends on a build and validation path that remains usable during an incident.
