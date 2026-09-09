---
title: Consistency, conventions, and mental models
description: Use stable concepts and familiar interaction conventions so users can predict behavior without relearning the interface on each screen.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - primary-source
  - derived-guidance
topics:
  - product-design
  - ux
  - interaction-design
related:
  - product-design/affordances-and-signifiers
  - product-design/recognition-vs-recall
  - product-design/cognitive-load
sources:
  - type: literature
    title: "The Design of Everyday Things"
    note: Norman explains conceptual models, mappings, signifiers, and the role of learned expectations in interaction.
  - type: primary-source
    title: "10 Usability Heuristics for User Interface Design"
    note: Nielsen identifies match with the real world and consistency with standards as general usability heuristics.
lastReviewed: "2026-09-09"
---

# Consistency, conventions, and mental models

Consistency lets users transfer what they learned in one part of a product to another. Conventions let them transfer knowledge from other products, platforms, and domains.

A mental model is a user's working explanation of how a system behaves. It does not need to match the implementation. It needs to predict the parts of the system that matter for the task.

## Keep the product internally consistent

The same concept should use the same term, visual role, and interaction rule unless a real semantic difference exists.

Examples include:

- one term for one domain object;
- stable placement for repeated primary actions;
- the same control state meaning the same thing;
- consistent keyboard and focus behavior for equivalent components;
- common feedback patterns for similar operations.

Internal consistency reduces relearning and makes unusual behavior more noticeable.

## Reuse external conventions deliberately

Users bring expectations from operating systems, browsers, established applications, and domain tools. Following a familiar convention can make an interaction easier to recognize without additional instruction.

A convention is not automatically correct for every product. Platform conventions can conflict, a domain can require different semantics, and a familiar pattern can carry assumptions that do not fit the current task.

When a product breaks a strong convention, the benefit should outweigh the learning and error cost.

## Support a coherent mental model

Names, information structure, visible state, and action results should tell a compatible story about how the product works.

A weak mental model appears when similar objects behave differently without explanation, when the interface exposes implementation details that do not map to user goals, or when an action changes hidden state that later produces surprising behavior.

Make important state and relationships visible enough that users can predict consequences.

## Consistency is not sameness

Different tasks can require different controls. Forcing one interaction pattern onto unrelated work can create false consistency and reduce clarity.

Preserve semantic consistency before visual sameness. Two controls that look identical should not have materially different consequences, and two different concepts do not need identical presentation only to satisfy a style rule.

## Limits

Mental models vary with expertise and prior experience. A convention that is obvious to one group can be unfamiliar to another.

Research and usability evaluation are useful when a design depends on assumptions about what users already know.

## Sources

- Don Norman. *The Design of Everyday Things*. Revised and Expanded Edition. Basic Books, 2013.
- Jakob Nielsen. "10 Usability Heuristics for User Interface Design." Nielsen Norman Group.
