---
title: "Database index"
description: "A secondary data structure that helps a database locate rows without scanning the entire underlying data set."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - databases
  - performance
related:
  - databases/indexes-and-query-planning
sources:
  - type: primary-source
    title: "PostgreSQL Documentation: Indexes"
    url: "https://www.postgresql.org/docs/current/indexes.html"
lastReviewed: "2026-09-08"
---

# Database index

A database index is an auxiliary data structure that maps searchable values to row locations or directly stored row data.

An index can reduce read cost when its structure matches the query. It also consumes storage and adds maintenance work to inserts, updates, and deletes.

An index is an access path available to the query planner, not a command that the planner must use.
