---
title: Sequences, stacks, queues, and deques
description: Choose linear structures by access pattern, mutation cost, locality, and required ordering discipline.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - data-structures
  - arrays
  - linked-lists
  - stacks
  - queues
related:
  - performance/latency-vs-throughput
  - performance/bounded-work
sources:
  - type: literature
    title: "Introduction to Algorithms"
    note: Cormen, Leiserson, Rivest, and Stein describe arrays, linked structures, stacks, queues, and asymptotic operation costs.
lastReviewed: "2026-09-08"
---

# Sequences, stacks, queues, and deques

Linear structures store elements in an ordered sequence, but they make different trade-offs for indexing, insertion, removal, and memory layout.

## Arrays and dynamic arrays

An array stores elements in contiguous positions and supports direct indexing by position.

A dynamic array keeps the same logical model while growing its backing storage when capacity is exhausted.

Index access is constant time. Appending is commonly amortized constant time when growth happens geometrically, although an individual growth operation can copy many elements.

Contiguous storage also tends to have good cache locality.

## Linked lists

A linked list stores each element with one or more links to other elements.

Insertion or removal can be constant time when the exact node position is already known. Finding that position is usually linear because the structure does not provide direct indexed access.

Linked lists can avoid large contiguous reallocations, but pointer overhead and poor locality often make them less efficient than dynamic arrays for ordinary sequential collections.

## Stack

A stack uses last-in, first-out ordering.

Push and pop operate at one end. Stacks fit nested work such as expression evaluation, depth-first traversal, call state, and undo histories where the newest item should be handled first.

## Queue and deque

A queue uses first-in, first-out ordering.

A deque supports insertion and removal at both ends. It can represent a queue, stack, sliding window, or work-stealing boundary depending on how each end is used.

## Choose from access patterns

Do not select a structure only from one advertised complexity value.

Consider:

- whether indexed lookup is required;
- whether insertion occurs at the ends or in the middle;
- expected collection size;
- iteration frequency and locality;
- allocation overhead;
- whether stable element addresses matter;
- whether the structure must remain bounded.

For many application collections, a dynamic array is the simplest useful default. Use another structure when its access pattern solves a measured or correctness-relevant need.
