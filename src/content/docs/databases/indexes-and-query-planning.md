---
title: Indexes and query planning
description: Use indexes to turn scans into targeted lookups, and understand how the query planner decides whether an index helps.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - primary-source
  - derived-guidance
topics:
  - databases
  - indexes
  - query-planning
  - performance
related:
  - problems/n-plus-one-queries
  - performance/measure-before-optimizing
  - performance/bounded-work
  - performance/latency-vs-throughput
  - databases/normalization-vs-denormalization
sources:
  - type: literature
    title: "Access Path Selection in a Relational Database Management System"
    note: Selinger and colleagues describe cost-based access path selection, the basis of modern query optimizers. ACM SIGMOD, 1979.
  - type: primary-source
    title: "PostgreSQL Documentation: Using EXPLAIN"
    url: "https://www.postgresql.org/docs/current/using-explain.html"
    note: PostgreSQL explains how to read a query plan, including scan choices, estimated cost, and estimated rows.
  - type: literature
    title: "Use The Index, Luke!"
    url: "https://use-the-index-luke.com/"
    note: Markus Winand explains index structure, index-aware query design, and common reasons an index is not used.
lastReviewed: "2026-09-05"
---

# Indexes and query planning

An index is a secondary data structure that lets the database find matching rows without reading every row. It trades extra storage and slower writes for faster reads on the columns it covers.

The problem being solved is scan cost. Without a useful index, a query that filters on a column must examine every row in the table. As the table grows, that cost grows with it.

## The mechanism at a product-neutral level

The most common index is an ordered structure, usually a B-tree, that keeps keys sorted.

Because the keys are ordered, the database can find a value, a range, or a prefix with a small number of steps instead of a full scan.

Ordered indexes also serve sorting and some grouping without a separate sort.

Other index types fit other access patterns: hash indexes for equality only, inverted indexes for text search, and specialized structures for geospatial or multi-dimensional data.

The principle is the same: match the index structure to the query's access shape.

An index entry points back to the row. If the index contains every column a query needs, the database can answer from the index alone and skip the row lookup. This is a covering index.

## How the planner decides

The application states what result it wants. The query planner decides how to produce it. For one query, the planner may choose a full scan, an index scan, a join order, and a join method.

The planner is cost-based. It estimates the cost of each candidate plan using statistics about the data, such as row counts and how many distinct values a column has.

It then picks the plan with the lowest estimated cost.

This means an index is an option, not a command. The planner uses an index only when it estimates that the index lowers cost.

For a query that matches a large fraction of the table, a full scan can be cheaper than many random index lookups.

Read the chosen plan with the database's explain feature. A plan shows the scan type, the estimated rows, and the estimated cost, which reveals where the query spends its work.

```text
Index Scan using orders_customer_id_idx on orders
  Index Cond: (customer_id = 42)
  estimated rows: 8
```

## Trade-offs

Every index speeds up some reads and slows down every write to its table. An insert, update, or delete must also maintain each affected index.

A table with many indexes pays that cost on every write.

Indexes also use storage and memory. An index that no query uses is pure overhead: it adds write cost and space without improving any read.

Column order in a composite index matters. An index on `(a, b)` helps queries that filter on `a`, or on `a` and `b`, but usually not queries that filter only on `b`.

:::tip[Measure the plan, not the guess]
Add an index because a real query's plan shows an expensive scan, then confirm the plan changes after you add it.

Do not add indexes speculatively across many columns. The measure before optimizing entry covers this discipline.
:::

## Common failure modes and misleading assumptions

- Assuming a column is indexed because it is a foreign key or is queried often. Index creation is usually explicit.
- Wrapping the indexed column in a function or a leading wildcard, which prevents the ordered index from applying.
- Adding an index for every column and expecting only benefit. Write cost and storage grow, and unused indexes never pay back.
- Reading a slow query and guessing the cause instead of reading the plan.
- Expecting an index to help a query that returns most of the table. A scan can be the cheaper plan.

## Interaction with application and distributed boundaries

The N+1 query problem is an access-pattern problem that no single index fixes: the cost comes from many round trips, not from a slow scan. Reduce the round trips first, then index the batched query.

Data modeling shapes indexing. A denormalized column can serve a read from one index instead of a join, at the cost of keeping the copy consistent. The normalization versus denormalization entry covers that trade-off.

Statistics can drift after large writes or a migration, which can push the planner toward a worse plan until statistics are refreshed.

Treat a sudden plan change after a bulk load as a statistics question first.

## When an index is not the answer

Do not add an index before you have a query whose plan shows the scan is the real cost.

For a small table, a full scan can already be fast enough, and the index only adds write cost.

Sometimes the better fix is a different query, a bounded result set, or a caching layer rather than another index.

## Sources

- Patricia Selinger, Morton Astrahan, Donald Chamberlin, Raymond Lorie, and Thomas Price. "Access Path Selection in a Relational Database Management System." *ACM SIGMOD*, 1979.
- The PostgreSQL Global Development Group. "Using EXPLAIN." *PostgreSQL Documentation*.
- Markus Winand. *Use The Index, Luke!*
