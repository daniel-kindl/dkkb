---
title: Make system status visible
description: Give users timely, understandable feedback about what the system is doing, what changed, and whether an action succeeded.
type: principle
status: reviewed
confidence: high
provenance:
  - primary-source
  - literature
topics:
  - product-design
  - ux
  - interaction-design
sources:
  - type: primary-source
    title: "10 Usability Heuristics for User Interface Design"
    note: Nielsen identifies visibility of system status as a core usability heuristic.
lastReviewed: "2026-09-08"
---

# Make system status visible

Users should receive timely, understandable feedback about what the system is doing and what changed after an action.

Without feedback, people must guess whether an input was accepted, whether work is still in progress, or whether they should repeat an action. Repeated actions can then create duplicate submissions, conflicting state, or unnecessary frustration.

## Useful feedback

Feedback can communicate:

- that an action was received;
- that work is in progress;
- that an action succeeded or failed;
- what state changed;
- whether further action is required;
- when the system cannot determine the final state yet.

The feedback should match the importance and duration of the operation. A fast local toggle usually needs immediate state change, while a long-running or remote operation may need progress, status, or completion information.

## Avoid false certainty

Do not report success before the system has reached the state that the message claims.

Optimistic interfaces can update early when rollback is safe, but they should still handle rejection, conflict, or connectivity failure explicitly.

## Avoid noise

Feedback can become harmful when every minor interaction produces a toast, animation, or interruption. Persistent state changes are often better communicated by the changed interface itself.

Use additional notifications when the result would otherwise be easy to miss or when the user must understand a consequence.

## Sources

- Jakob Nielsen. "10 Usability Heuristics for User Interface Design." Nielsen Norman Group.
