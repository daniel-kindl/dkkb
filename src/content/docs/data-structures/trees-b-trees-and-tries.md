---
title: Trees, B-trees, and tries
description: Organize hierarchical and ordered keys with structures designed for different lookup and storage-access patterns.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - data-structures
  - trees
  - b-tree
  - trie
related:
  - databases/indexes-and-query-planning
  - performance/bounded-work
sources:
  - type: literature
    title: "Introduction to Algorithms"
    note: The tree chapters describe binary search trees and balanced-tree reasoning.
  - type: literature
    title: "Organization and Maintenance of Large Ordered Indexes"
    note: Bayer and McCreight introduce the B-tree for large ordered indexes.
lastReviewed: "2026-09-08"
---

# Trees, B-trees, and tries

A tree organizes nodes through parent-child relationships without cycles in the tree itself.

Different tree families preserve different invariants to support ordered lookup, hierarchical structure, prefix lookup, or storage-efficient indexing.

## Search trees

A binary search tree places smaller and larger keys on different sides of each node according to its comparison rule.

Lookup cost depends on tree height.

An unbalanced tree can degrade toward linear behavior. Balanced search trees maintain additional invariants so height stays logarithmic as the collection grows.

## B-trees

A [B-tree](../glossary/b-tree.md) stores many keys and child pointers per node rather than only one key per node.

The high branching factor keeps tree height small and reduces the number of storage pages or blocks needed for a lookup.

This is why B-tree variants are common in database and filesystem indexes.

DKKB's [database index guidance](../databases/indexes-and-query-planning.md) owns query-planning and persistence-specific behavior. This entry owns the structure itself.

## Tries

A trie organizes keys by prefixes.

Each step represents part of a key, such as one character, byte, or token segment.

Prefix lookup can therefore depend on key length rather than the number of stored keys.

The trade-off is node and pointer overhead, especially when the key alphabet is large or paths are sparse. Compressed trie variants reduce repeated single-child paths.

## Tree choice follows operations

Use ordered search trees when comparison order and range traversal matter.

Use B-tree-style structures when ordered access must remain efficient across block or page-oriented storage.

Use tries when prefix relationships are first-class and memory overhead is acceptable.

## Practical guidance

State the invariant that keeps the tree useful: balance, branching factor, prefix structure, or another rule.

Do not claim logarithmic search for an arbitrary tree without the balancing or shape assumption that makes the bound true.
