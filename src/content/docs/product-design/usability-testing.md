---
title: Usability testing
description: Observe representative users attempting realistic tasks to find interaction problems and test whether a design supports task completion.
type: practice
status: reviewed
confidence: high
provenance:
  - primary-source
  - literature
topics:
  - product-design
  - ux
  - usability
related:
  - product-design/user-centered-design
  - testing/testing-strategy
sources:
  - type: primary-source
    title: "ISO 9241-11:2018 Ergonomics of human-system interaction, Part 11"
    note: Defines usability relative to users, goals, tasks, resources, results, and context of use.
  - type: primary-source
    title: "GOV.UK Service Manual: Using moderated usability testing"
    note: Describes observing participants completing realistic service tasks.
lastReviewed: "2026-09-09"
---

# Usability testing

Usability testing observes people attempting realistic tasks with a design, prototype, or working product. It helps find where users misunderstand the interface, cannot progress, make errors, or need excessive effort.

It is different from functional testing. An automated test can prove that a submit action stores the intended value. It cannot by itself prove that users can find the action, understand the form, or recover from an error.

## Design around tasks

Use tasks that represent meaningful user goals. Avoid instructions that reveal the control name or path being tested.

Recruit participants whose relevant knowledge, constraints, and context resemble the intended users. Include disabled users when accessibility and assistive-technology interaction are part of the question.

Observe behavior before explaining the interface. Record task completion, important errors, hesitation, unexpected paths, and participant comments separately.

## Interpret findings carefully

A usability session can provide strong evidence that a specific problem exists. A small qualitative study usually cannot estimate how frequently that problem occurs in the full population.

Repeated problems across participants deserve attention, but severity also matters. A rare failure can be critical when it blocks completion or creates a high-impact mistake.

## Test early enough to change the design

Low-fidelity prototypes can expose structure and flow problems before implementation cost increases. Working software is useful when real data, timing, assistive technology, or system behavior affects the experience.

## Limits

A test setting changes behavior. Participants can be more patient, attentive, or willing to describe thoughts than normal users. Usability testing also does not replace accessibility conformance review, production metrics, or domain validation.

## Sources

- ISO. *ISO 9241-11:2018 Ergonomics of human-system interaction, Part 11: Usability: Definitions and concepts*. 2018.
- UK Government Digital Service. *Using moderated usability testing*.
