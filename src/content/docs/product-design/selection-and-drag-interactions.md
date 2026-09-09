---
title: Selection and drag interactions
description: Design selection and direct manipulation with explicit state, predictable feedback, and non-drag alternatives when dragging is not essential.
type: pattern
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
    note: Includes a success criterion requiring a single-pointer alternative for dragging movements when dragging is not essential.
lastReviewed: "2026-09-09"
---

# Selection and drag interactions

Selection marks one or more objects for later action. Dragging combines selection, movement, and placement into one continuous interaction.

## Make selection explicit

Selected state should remain visible after the initiating pointer or keyboard action. Define whether selection is single or multiple, how ranges work, and how users clear the set.

Bulk actions should state which items they affect before destructive or high-impact execution.

## Use drag when spatial manipulation matters

Dragging can be effective for reordering, moving objects between spatial groups, or direct manipulation where the movement itself communicates the result.

It is a poor only-path interaction when precise movement is difficult, the drop target is small, or the operation has no clear spatial model.

Provide non-drag controls when accessibility requirements or task reliability call for them. Examples include move buttons, position controls, menus, or keyboard commands.

## Give continuous feedback

During a drag, show the active object, valid drop targets, forbidden destinations, and the predicted result. After drop, make the changed state clear and support undo when practical.

## Limits

Direct manipulation can feel efficient without being objectively faster or safer. Test complex drag interactions with representative input devices and users.

## Sources

- W3C. *Web Content Accessibility Guidelines (WCAG) 2.2*. 2023.
