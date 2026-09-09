---
title: Error prevention and recovery
description: Prevent predictable user errors where practical and make remaining errors understandable, recoverable, and proportionate to their consequences.
type: principle
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - product-design
  - ux
  - interaction-design
related:
  - product-design/feedback-and-system-status
  - product-design/affordances-and-signifiers
  - security/secure-defaults-and-fail-closed-behavior
sources:
  - type: primary-source
    title: "10 Usability Heuristics for User Interface Design"
    note: Nielsen separates error prevention from guidance that helps users recognize, diagnose, and recover from errors.
lastReviewed: "2026-09-09"
---

# Error prevention and recovery

Interfaces should prevent predictable errors when prevention does not block valid work. When an error still occurs, the interface should help the user understand the state and recover without unnecessary loss.

Prevention and recovery solve different problems. Prevention reduces the chance of an invalid or unintended action. Recovery limits the cost when prevention is incomplete or inappropriate.

## Prevent errors at the point of action

Useful prevention techniques include:

- constrain inputs to values the system can accept;
- show requirements before submission rather than only after failure;
- choose safe defaults when one option is clearly safer for the intended context;
- disable actions only when the reason is visible or discoverable;
- separate destructive actions from common actions;
- show the consequence of an irreversible or high-impact action before commitment.

Prevention should not reject unusual but valid work only to simplify the interface.

## Prefer reversible actions

Undo, restore, draft state, version history, and delayed destructive execution can reduce the cost of mistakes more reliably than confirmation dialogs alone.

A confirmation step is useful when the consequence is material and the user has enough information to make a meaningful decision. Repeated low-value confirmations train users to dismiss the dialog without evaluating it.

## Make recovery specific

An error message should explain what failed in terms the user can act on. Preserve valid input where possible and place corrective guidance near the affected control or state.

Recovery should answer the questions that matter for the next action:

- what happened;
- what state was preserved or changed;
- what the user can do next;
- whether retrying is safe;
- whether the problem requires another actor or later action.

Do not expose internal exception text as user guidance when it does not help recovery.

## Match the design to consequence

The cost of an error should determine the strength of prevention and recovery mechanisms. A reversible display preference does not need the same friction as deleting production data or sending a financial transaction.

High-consequence workflows can justify stronger validation, review, authorization, confirmation, or staged execution. Extra friction should be tied to risk rather than added uniformly.

## Limits

Not every error can be prevented. External systems can fail, concurrent state can change, users can intentionally enter unusual values, and strict constraints can make expert work impossible.

A robust design combines prevention, clear system status, and recovery instead of assuming one mechanism can eliminate all errors.

## Sources

- Jakob Nielsen. "10 Usability Heuristics for User Interface Design." Nielsen Norman Group.
