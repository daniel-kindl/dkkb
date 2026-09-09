---
title: Navigation, search, and location cues
description: Combine browse paths, search, breadcrumbs, and current-location cues according to how users know the target and how the information space is structured.
type: decision
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - product-design
  - information-architecture
  - ux
related:
  - product-design/recognition-vs-recall
sources:
  - type: literature
    title: "Information Architecture for the Web and Beyond"
    note: Treats navigation and search as complementary findability systems.
lastReviewed: "2026-09-09"
---

# Navigation, search, and location cues

Navigation helps users browse a known structure. Search helps users retrieve candidates from a query. Products often need both because users vary in what they know about the target.

## Prefer navigation when structure is useful

Navigation works well when users can recognize categories, want to explore, or do not yet know the exact item name. It also teaches the shape of the domain.

Deep structures need clear parent-child relationships and stable labels. A user should not need to guess several ambiguous category choices in sequence.

## Prefer search when users can describe the target

Search is useful in large collections and for repeat users who know a title, identifier, attribute, or phrase. It depends on query handling, metadata, ranking, and result presentation rather than only a text field.

Search should not be used to compensate for a structure that makes common content impossible to browse.

## Use breadcrumbs as location cues

Breadcrumbs show a hierarchical or historical path depending on the product model. Hierarchical breadcrumbs are most useful when parent categories have meaning and users can move to them.

Do not add breadcrumbs to a flat product only because they are a familiar pattern.

## Keep current location visible

Navigation state, headings, URLs, breadcrumbs, and selected controls can reinforce where the user is. These cues should agree. Conflicting signals create uncertainty about scope.

## Limits

Some products are task flows rather than information spaces. Forcing global navigation, search, or breadcrumbs into a short focused flow can add noise without improving orientation.

## Sources

- Louis Rosenfeld, Peter Morville, and Jorge Arango. *Information Architecture for the Web and Beyond*. 4th ed. O'Reilly Media, 2015.
