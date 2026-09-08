---
title: "B-tree"
description: "A balanced ordered search tree designed to keep lookup, insertion, and deletion efficient while using storage pages effectively."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
aliases:
  - "B tree"
topics:
  - databases
  - data-structures
related:
  - databases/indexes-and-query-planning
sources:
  - type: literature
    title: "Organization and Maintenance of Large Ordered Indices"
lastReviewed: "2026-09-08"
---

# B-tree

A B-tree is a balanced ordered tree that stores many keys per node and keeps all leaves at the same depth.

Its high branching factor reduces the number of storage pages that a lookup must visit. This makes B-tree variants common for database indexes.

A B-tree is not the only index structure. Hash, inverted, spatial, and other indexes fit different access patterns.
