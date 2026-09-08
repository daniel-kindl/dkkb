---
title: "Pagination"
description: "The division of a collection read into bounded pages that clients retrieve incrementally."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - api-design
  - performance
related:
  - api-design/pagination-and-bounded-collection-reads
sources:
  - type: primary-source
    title: "PostgreSQL Documentation: LIMIT and OFFSET"
    url: "https://www.postgresql.org/docs/current/queries-limit.html"
lastReviewed: "2026-09-08"
---

# Pagination

Pagination divides a collection read into bounded pages instead of returning the entire matching set in one response.

A paging contract defines the maximum page size, ordering, and how the client requests the next page.

Offset and keyset pagination have different cost and consistency properties. Stable ordering is required so page boundaries remain meaningful.
