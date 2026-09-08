---
title: "Rollback"
description: "The recovery action of restoring a previous known-good software or configuration state."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
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

# Rollback

Rollback restores a previous known-good software or configuration state after a release fails verification.

Rollback is safe only when the previous version can still work with the current data, contracts, and external effects.

A rollback plan is stronger when the exact previous artifact is retained and the recovery procedure is automated and tested.
