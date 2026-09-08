---
title: Hash tables
description: Map keys to values through hashing while accounting for collisions, resizing, memory cost, and adversarial inputs.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - data-structures
  - hashing
  - lookup
related:
  - performance/bounded-work
  - security/secure-defaults-and-fail-closed-behavior
sources:
  - type: literature
    title: "Introduction to Algorithms"
    note: The hashing chapters describe collision handling, load factors, and expected lookup behavior.
lastReviewed: "2026-09-08"
---

# Hash tables

A hash table maps a key to a storage location using a hash function.

With a suitable hash distribution and controlled load factor, lookup, insertion, and deletion are commonly expected constant-time operations.

That expectation is not a worst-case guarantee.

## Collisions are normal

Different keys can produce the same table position.

A hash table therefore needs a collision strategy such as separate chaining or open addressing.

Correctness does not depend on collisions being impossible. Performance depends on collisions remaining sufficiently distributed.

## Load factor matters

As a table becomes crowded, collision work increases.

Implementations usually grow and rehash the table after a threshold. Growth is expensive for one operation but can keep average operations cheap over a sequence of updates.

This is another example of amortized cost.

## Hashing is not ordering

A hash table is optimized for key-based access, not sorted traversal.

Iteration order may be undefined, implementation-specific, or intentionally randomized. Do not use accidental iteration order as an application contract.

If ordered range queries are central, a tree or sorted sequence can be a better fit.

## Hash functions have different goals

A hash used for a table needs stable, well-distributed mapping for expected keys.

A cryptographic hash has stronger collision-resistance and security goals. The two concepts are related but not interchangeable requirements.

For untrusted keys, implementations may use randomized or hardened hashing to reduce collision-based denial-of-service risk.

## Practical guidance

Use a hash table for key-to-value lookup when exact-key access dominates and sorted order is unnecessary.

Keep the key's equality and hash semantics aligned. Mutating fields that participate in hashing while the key is stored can make an entry unreachable in implementations that assume key stability.

Measure memory cost as well as lookup speed when tables become large.
