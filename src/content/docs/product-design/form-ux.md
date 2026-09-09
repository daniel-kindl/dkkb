---
title: Form UX
description: Design forms around the information required for a task, with clear labels, predictable validation, preserved input, and accessible recovery.
type: practice
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - product-design
  - ux
  - accessibility
related:
  - product-design/cognitive-load
  - product-design/feedback-and-system-status
sources:
  - type: primary-source
    title: "W3C Web Accessibility Initiative: Forms Tutorial"
    note: Covers labels, grouping, instructions, validation, and feedback for accessible forms.
lastReviewed: "2026-09-09"
---

# Form UX

A form should ask for information that is necessary for the current task and make the required input understandable before submission.

## Ask only for necessary information

Every field adds reading, entry, validation, privacy, and recovery cost. Remove information that is not needed for the transaction or a justified follow-up.

Group related fields and use the user's domain language. Keep labels visible and specific. Placeholder text is not a reliable replacement for a label.

## Explain constraints before failure

Show required formats, ranges, password rules, and other constraints before users violate them. Use input controls that fit the data without making valid unusual values impossible.

Validate at a point where feedback is useful. Immediate validation can help with clear local constraints, but error messages that appear while a user is still typing can create noise.

## Preserve work and support recovery

After a validation or server error, preserve valid input when safe. Identify the affected field, explain the problem in actionable language, and provide an overall error summary when several errors need attention.

Success feedback should make completion clear and state what happens next when that is not obvious.

## Accessibility is part of form design

Controls need programmatic names, associated instructions, understandable error identification, keyboard operation, and focus behavior that lets assistive-technology users find feedback.

These are accessibility requirements and implementation concerns as well as UX concerns. Product-design guidance does not replace the repository accessibility standard.

## Limits

Shorter is not always better. Some tasks require complex evidence, branching questions, or review. Break long forms into steps only when the structure helps users understand progress and preserves context.

## Sources

- W3C Web Accessibility Initiative. *Forms Tutorial*.
