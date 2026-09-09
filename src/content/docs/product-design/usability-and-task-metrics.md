---
title: Usability and task metrics
description: Evaluate usability through effectiveness, efficiency, satisfaction, and task-relevant measures while keeping it distinct from correctness and accessibility conformance.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - product-design
  - usability
related:
  - testing/testing-strategy
  - product-design/user-centered-design
sources:
  - type: primary-source
    title: "ISO 9241-11:2018 Ergonomics of human-system interaction, Part 11"
    note: Defines usability in terms of effectiveness, efficiency, and satisfaction in a specified context of use.
lastReviewed: "2026-09-09"
---

# Usability and task metrics

Usability concerns how effectively, efficiently, and satisfactorily specified users achieve specified goals in a specified context of use.

It is not the same as functional correctness. A function can return the correct result while users cannot discover or operate it reliably.

It is also not the same as accessibility conformance. Accessibility requirements address barriers and inclusive access. A conforming interface can still have broader usability problems, and a seemingly easy interface can still violate accessibility requirements.

## Measure the task

Useful measures can include task completion, critical error rate, time on task, retries, abandonment, help requests, and satisfaction. Choose measures that represent the user outcome and consequence of failure.

A faster task is not automatically better if speed comes from skipped review, increased errors, or reduced understanding.

## Define success before measurement

State what counts as completion, which errors are critical, which users and context the result represents, and whether assistance is permitted.

Without this definition, two teams can report different task-success rates from the same sessions.

## Use metrics with qualitative evidence

Metrics indicate magnitude and change. Observation and research can explain why a task succeeds or fails. Use both when the decision requires diagnosis as well as measurement.

## Avoid vanity UX metrics

Page views, session duration, clicks, or engagement can be useful operational measures, but they are not automatically evidence of a better experience. A successful product can reduce time and interaction when users want to finish a task quickly.

## Limits

Benchmarks are context-specific. Compare measurements only when task, population, product state, and measurement method are sufficiently compatible.

## Sources

- ISO. *ISO 9241-11:2018 Ergonomics of human-system interaction, Part 11: Usability: Definitions and concepts*. 2018.
