---
title: Pagination versus infinite scrolling
description: Choose bounded pages, incremental loading, or continuous feeds according to navigation goals, position recovery, comparison, and collection size.
type: decision
status: reviewed
confidence: medium
provenance:
  - derived-guidance
topics:
  - product-design
  - ux
  - interaction-design
related:
  - product-design/feedback-and-system-status
  - product-design/cognitive-load
lastReviewed: "2026-09-09"
---

# Pagination versus infinite scrolling

Pagination divides a collection into addressable segments. Infinite scrolling loads more content as the user approaches the current end. A load-more pattern keeps one growing list but requires an explicit action.

## Pagination favors bounded navigation

Pagination can provide stable location, shareable state, predictable result counts, and easier return to a known position. It suits tasks where users compare ranges, revisit results, or need a clear sense of progress.

Its cost is repeated navigation and possible context changes between segments.

## Infinite scrolling favors open-ended browsing

Continuous loading reduces explicit navigation and can suit feeds where users mainly browse forward without a known endpoint.

It can make footer content difficult to reach, hide total progress, consume resources, and make position recovery difficult after opening an item or reloading the page.

## Load more is a middle option

An explicit load-more control preserves a visible boundary and user control while avoiding full page navigation. It still needs stable focus and position behavior when new content appears.

## Preserve location

Whichever model is used, returning from an item should restore the collection state, filters, sort, and position when practical. Back navigation that loses the user's place can dominate the cost of the paging model itself.

## Limits

No pattern is universally superior. Collection semantics, URL requirements, result volatility, accessibility, performance, and user intent should determine the choice.
