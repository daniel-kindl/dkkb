---
title: Friction, onboarding, and defaults
description: Remove interaction cost that does not support the user's goal while preserving deliberate friction where it improves understanding, safety, or control.
type: principle
status: reviewed
confidence: high
provenance:
  - derived-guidance
  - primary-source
topics:
  - product-design
  - ux
related:
  - product-design/progressive-disclosure
  - product-design/cognitive-load
sources:
  - type: primary-source
    title: "ISO 9241-210:2019 Ergonomics of human-system interaction, Part 210"
    note: Supports iterative design around user tasks and context rather than prescribed interaction counts.
lastReviewed: "2026-09-09"
---

# Friction, onboarding, and defaults

Friction is interaction cost that slows or complicates progress. Some friction is accidental. Some is useful because it creates time to understand, verify, authorize, or reconsider an action.

## Remove accidental friction

Common accidental costs include repeated data entry, unnecessary account gates, hidden prerequisites, needless navigation, duplicate confirmation, and asking for information before it is needed.

Measure friction against the task, not against a universal target such as click count.

## Onboard in context

Onboarding should teach what a user needs to complete the next meaningful task. Long introductory tours often present information before the user has context to understand it.

Progressive onboarding introduces guidance when the related feature or decision becomes relevant. Keep help available later so users do not have to remember a one-time explanation.

Skip onboarding when the interface and domain are already understandable. A tutorial should not compensate for avoidable interface ambiguity.

## Use defaults deliberately

A default can reduce repeated decisions and communicate the expected path. Choose it from evidence, safety, reversibility, and user context.

A safe default minimizes harmful consequences when the user accepts it without close review. It is especially important for privacy, security, destructive behavior, publication, and irreversible operations.

Do not use defaults to obtain consent or steer users toward an outcome that conflicts with their interests.

## Add deliberate friction by consequence

Extra review can be appropriate for high-impact actions, permission changes, financial commitments, or irreversible operations. Tie the friction to risk and give users enough information to make the review meaningful.

## Limits

Expert and repeated workflows can need a faster path than infrequent workflows. Preserve shortcuts when they do not remove necessary safeguards.

## Sources

- ISO. *ISO 9241-210:2019 Ergonomics of human-system interaction, Part 210: Human-centred design for interactive systems*. 2019.
