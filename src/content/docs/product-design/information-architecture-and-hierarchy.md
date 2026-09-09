---
title: Information architecture and hierarchy
description: Organize information, concepts, and navigation so users can understand what exists, where they are, and where to look next.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - product-design
  - information-architecture
related:
  - product-design/progressive-disclosure
  - product-design/recognition-vs-recall
sources:
  - type: literature
    title: "Information Architecture for the Web and Beyond"
    note: Covers organization, labeling, navigation, and search systems as related parts of information architecture.
lastReviewed: "2026-09-09"
---

# Information architecture and hierarchy

Information architecture defines how information and concepts are organized, named, related, and made findable. Visual layout presents that structure but is not the structure itself.

## Start from user concepts and tasks

Group information according to distinctions users can understand and that support real tasks. Internal ownership, database tables, and service boundaries are not automatically useful navigation structures.

A hierarchy should answer three questions: what is here, how this item relates to nearby items, and where a user can go next.

## Prefer meaningful levels

Broad navigation exposes more choices at one level. Deep navigation exposes fewer choices but requires more traversal. Neither is inherently better.

Choose depth and breadth from the size of the domain, label clarity, task frequency, and how easily users can predict the next category. Repeated ambiguous levels create more cost than a wider set of distinct choices.

## Use progressive disclosure for complexity

Large information spaces can reveal detail as users narrow the context. Disclosure should reduce competing information without hiding the current location or commonly needed paths.

## Separate structure from presentation

The same information architecture can have different responsive layouts. Conversely, a visually tidy grid can still contain an incoherent taxonomy.

## Limits

No hierarchy fits every user's mental model. Cross-links, search, aliases, and multiple entry points can support legitimate alternate paths without duplicating canonical information.

## Sources

- Louis Rosenfeld, Peter Morville, and Jorge Arango. *Information Architecture for the Web and Beyond*. 4th ed. O'Reilly Media, 2015.
