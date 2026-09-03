---
title: N+1 query problem
description: One query loads a collection and then additional queries load related data once per item.
type: problem
status: draft
confidence: high
provenance:
  - derived-guidance
topics: [databases, performance]
related: []
sources: []
lastReviewed: "2026-09-03"
---

# N+1 query problem

The N+1 query problem occurs when one query returns N records and application code performs another query for each record.

## Symptoms

Latency and database load grow with result size. A page that looks correct in small tests can become slow under realistic data volume.

## Detection

Count database round trips for one request. Use query logs, tracing, or ORM diagnostics to identify repeated statements that differ only by one key.

## Mitigation

Load related data in a bounded set of queries. Suitable techniques include joins, explicit eager loading, batch loaders, prefetching, or a query shaped for the read model.

## Trade-offs

Aggressive joins can duplicate rows, increase memory use, or fetch data that callers do not need. Eager loading every relation can replace many small queries with one excessively large query.

Optimize the access pattern that the caller actually uses.
