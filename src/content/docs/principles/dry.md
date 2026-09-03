---
title: Do not repeat knowledge
description: Keep each important piece of system knowledge in one authoritative representation when practical.
type: principle
status: draft
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - maintainability
  - duplication
  - knowledge
related: []
sources:
  - type: literature
    title: "The Pragmatic Programmer"
    note: Introduces DRY as avoiding duplicated knowledge rather than mechanically removing all repeated text.
lastReviewed: "2026-09-03"
---

# Do not repeat knowledge

DRY is about duplicated knowledge. It is not a rule that every repeated line of code must share one implementation.

A system becomes harder to change when one fact must be updated in several independent places. If those copies diverge, the system can become internally inconsistent.

:::caution[Similarity is not shared knowledge]
Two blocks can look the same today and still represent different concepts. Deduplicate because they encode one fact or rule, not only because their text is similar.
:::

## Context

Duplication matters most when several representations encode the same decision, rule, schema, constant, or business fact.

Two similar code blocks can represent different knowledge. Forcing them behind one abstraction can create coupling between concepts that only look alike today.

## Use DRY when

- one rule is maintained in several places;
- generated artifacts can derive from one authoritative source;
- callers repeat the same policy or invariant;
- duplicated configuration can drift independently.

## Do not deduplicate by appearance alone

Shared code is useful when the shared abstraction is stable and meaningful. It is harmful when unrelated behavior is combined only because the current implementation looks similar.

A small amount of local duplication can be cheaper than a premature abstraction that couples independent changes.

## Failure modes

Duplicated knowledge causes synchronization work and inconsistent behavior.

Over-applied DRY causes another failure mode: one abstraction gains many flags, exceptions, or conditional branches because several distinct concepts were forced together.

## Practical guidance

Ask whether two places must change together for the same reason. If yes, look for one authoritative representation. If no, similarity alone is not enough reason to combine them.

## Sources

- David Thomas and Andrew Hunt. *The Pragmatic Programmer*. Addison-Wesley.
