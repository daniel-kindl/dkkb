---
title: Search, filtering, and sorting UX
description: Help users narrow or order a collection while keeping query state, scope, result meaning, and recovery visible.
type: practice
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - product-design
  - ux
  - information-architecture
related:
  - product-design/recognition-vs-recall
  - product-design/feedback-and-system-status
sources:
  - type: literature
    title: "Search User Interfaces"
    note: Marti Hearst covers query formulation, result presentation, faceted navigation, and search interaction patterns.
lastReviewed: "2026-09-09"
---

# Search, filtering, and sorting UX

Search retrieves candidates from a query. Filters constrain a collection by attributes. Sorting changes result order without changing which items qualify.

Interfaces should keep those roles understandable instead of presenting every refinement control as the same operation.

## Make state visible

Show the active query, filters, scope, and sort order. Let users remove individual constraints and clear the set without rebuilding the whole search.

Preserve state when users inspect a result and return. Losing a carefully refined result set creates avoidable work.

## Design for imperfect queries

Search should handle empty results, spelling variation, common aliases, and ambiguous input according to the domain. When the system changes or broadens a query, make that behavior visible if it could change user interpretation.

An empty result is useful information when it explains the active constraints and offers safe recovery such as removing a filter or trying a broader term.

## Choose filters from the collection

Useful facets reflect distinctions users understand and that materially narrow the result set. Large filter panels full of low-value attributes increase scanning cost.

Show counts when they are accurate enough to support decisions. Do not imply precision that the data cannot provide.

## Sort by a defined meaning

Labels such as "best" or "recommended" hide ranking logic. Prefer explicit criteria when ranking affects user decisions, or explain what the ranking optimizes.

## Limits

Search is not automatically better than navigation, and filters are not useful for every small collection. The right interaction depends on collection size, user knowledge, task type, and available metadata.

## Sources

- Marti A. Hearst. *Search User Interfaces*. Cambridge University Press, 2009.
