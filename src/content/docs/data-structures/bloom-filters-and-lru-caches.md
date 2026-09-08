---
title: Bloom filters and LRU caches
description: Use compact probabilistic membership tests and recency-based eviction only when their approximation rules fit the workload.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - data-structures
  - bloom-filter
  - lru
  - caching
related:
  - performance/caching
  - performance/bounded-work
sources:
  - type: literature
    title: "Space/Time Trade-offs in Hash Coding with Allowable Errors"
    note: Burton Bloom introduces the probabilistic membership structure now called the Bloom filter.
  - type: literature
    title: "Evaluation Techniques for Storage Hierarchies"
    note: Mattson and coauthors formalize working-set and replacement-policy analysis including LRU behavior.
lastReviewed: "2026-09-08"
---

# Bloom filters and LRU caches

Some data structures deliberately trade exactness or replacement optimality for bounded memory and fast common operations.

Bloom filters and least-recently-used caches are useful examples because their limits are part of the contract.

## Bloom filter

A Bloom filter is a compact probabilistic set-membership structure.

To add an item, several hash functions map it to bits in a fixed bit array. A lookup checks those same bit positions.

If any required bit is unset, the item is definitely absent from the filter.

If every required bit is set, the item may be present. False positives are possible. Standard Bloom filters do not produce false negatives for inserted items unless the structure is modified outside its assumptions.

The false-positive rate depends on filter size, number of inserted items, and number of hash functions.

A Bloom filter is therefore useful as a cheap rejection step before a more expensive exact lookup.

## LRU cache

An LRU cache evicts the item that has gone unused for the longest time when capacity is needed.

The policy assumes recent use is a useful predictor of near-future reuse.

A common implementation combines a [hash table](./hash-tables.md) for direct lookup with a recency-ordered linked structure so lookup and recency updates remain constant time.

LRU is not universally optimal. Sequential scans larger than the [cache](../glossary/cache.md) can evict useful hot entries, and some workloads benefit from frequency-aware or segmented policies.

## Approximation must be safe

A Bloom filter false positive must only cause extra work, not an incorrect business decision.

An LRU eviction must remove only reusable state, not authoritative data.

The surrounding system must remain correct when the approximation behaves at its allowed worst case.

## Practical guidance

Use a Bloom filter when exact negative checks are expensive and occasional false positives are acceptable.

Use LRU when cache capacity is bounded and recency is a reasonable reuse signal.

Measure hit rate, memory cost, false-positive rate, and eviction behavior against the real workload before adding more complex policies.
