---
title: "Query plan"
description: "The concrete strategy a database chooses to execute a query, including scans, joins, ordering, and other operators."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
aliases:
  - "execution plan"
topics:
  - databases
  - performance
related:
  - databases/indexes-and-query-planning
sources:
  - type: primary-source
    title: "PostgreSQL Documentation: Using EXPLAIN"
    url: "https://www.postgresql.org/docs/current/using-explain.html"
lastReviewed: "2026-09-08"
---

# Query plan

A query plan is the sequence of physical operations a database chooses to produce the result of a query.

A plan can include table or index scans, join algorithms, sorting, aggregation, and estimated row counts. Cost-based planners compare candidate plans using statistics.

Reading the chosen plan helps distinguish an expensive access path from a slow application pattern.
