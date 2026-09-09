---
title: Optimistic UI, autosave, undo, and motion
description: Use immediate feedback, automatic persistence, reversible actions, and animation only when their failure and accessibility behavior are defined.
type: principle
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - product-design
  - interaction-design
  - accessibility
related:
  - product-design/feedback-and-system-status
sources:
  - type: primary-source
    title: "Web Content Accessibility Guidelines (WCAG) 2.2"
    note: Includes requirements relevant to animation, motion actuation, focus, and status communication.
lastReviewed: "2026-09-09"
---

# Optimistic UI, autosave, undo, and motion

Interfaces can feel immediate by updating before remote confirmation, saving automatically, making actions reversible, and using motion to explain state change. Each technique needs an explicit failure model.

## Optimistic UI

Optimistic updates are suitable when success is likely, the local result is easy to reverse, and a rejected operation can be explained without corrupting user work.

Do not use optimism to claim durable success for high-impact operations before the system establishes it. Define rollback, retry, conflict, and offline behavior first.

## Autosave

Autosave can remove repeated manual work, but users need to know whether changes are pending, saved, failed, or conflicting. Preserve recoverable versions when accidental edits or concurrent changes are plausible.

A visible Save action can still be appropriate when saving represents publication, approval, transaction submission, or another semantic commitment.

## Undo

Undo can protect users with less interruption than confirmation. Define the scope, lifetime, and effect of undo clearly. Do not offer undo when the underlying action cannot actually be reversed reliably.

## Motion

Motion can communicate continuity, spatial relationships, change, and focus. Decorative movement that delays work or draws attention without meaning adds cost.

Respect reduced-motion preferences and avoid interactions that require motion perception. Essential state changes need a non-motion representation.

## Limits

These techniques interact. An optimistic autosave with animated state transitions can create false confidence if the persistence state is hidden. Prefer truthful status over perceived speed.

## Sources

- W3C. *Web Content Accessibility Guidelines (WCAG) 2.2*. 2023.
