---
title: Manage cognitive load
description: Reduce unnecessary mental work while preserving the information and decisions users need to complete a task.
type: principle
status: reviewed
confidence: high
provenance:
  - literature
topics:
  - product-design
  - ux
  - usability
sources:
  - type: literature
    title: "Cognitive Load During Problem Solving: Effects on Learning"
    note: Sweller describes cognitive load limits and their effect on problem solving and learning.
lastReviewed: "2026-09-08"
---

# Manage cognitive load

An interface should avoid making users spend mental effort on information, decisions, or memory work that does not contribute to their goal.

Human attention and working memory are limited. Interfaces compete for those resources through navigation choices, unfamiliar terminology, hidden state, interruptions, dense presentation, and requirements to remember information between steps.

## Reduce unnecessary load

Useful approaches include:

- keep important state visible when practical;
- group related information and controls;
- use familiar language and conventions;
- avoid presenting irrelevant choices at the same time;
- preserve context across multi-step tasks;
- make consequences and next actions clear.

## Do not remove necessary complexity

Reducing cognitive load does not mean making every interface sparse or hiding all advanced functionality.

A domain can be genuinely complex. Hiding important information can increase mental effort by forcing users to reconstruct context, open more surfaces, or remember what was previously visible.

The goal is to remove accidental mental work while keeping necessary domain complexity understandable.

## Failure modes

Common failures include:

- excessive choice without useful grouping;
- inconsistent terminology;
- forcing users to remember values from another screen;
- unexplained icons or controls;
- interruptions that break task context;
- progressive disclosure that hides information users repeatedly need.

## Sources

- John Sweller. "Cognitive Load During Problem Solving: Effects on Learning." *Cognitive Science*, 1988.
