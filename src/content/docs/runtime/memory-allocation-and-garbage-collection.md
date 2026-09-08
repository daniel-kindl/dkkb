---
title: Memory allocation and garbage collection
description: Manage object lifetime through explicit or automatic reclamation while accounting for fragmentation, locality, and pause behavior.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - runtime
  - allocation
  - garbage-collection
related:
  - runtime/virtual-memory-stack-and-heap
  - performance/measure-before-optimizing
  - performance/latency-vs-throughput
sources:
  - type: literature
    title: "Uniprocessor Garbage Collection Techniques"
    note: Wilson surveys tracing, reference counting, copying, mark-sweep, generational, and related collection techniques.
  - type: literature
    title: "The Garbage Collection Handbook"
    note: Jones, Hosking, and Moss cover automatic memory management algorithms and implementation trade-offs.
lastReviewed: "2026-09-08"
---

# Memory allocation and garbage collection

Dynamic allocation gives data a lifetime that can outlive one call frame.

The system must eventually reclaim storage that is no longer needed, either through explicit ownership rules, automatic garbage collection, reference counting, region-based lifetime, or another mechanism.

## Allocators manage free space

A general-purpose allocator must find usable memory, track allocated regions, return freed regions to future allocations, and control fragmentation.

Allocation cost depends on size classes, thread-local caches, synchronization, fragmentation, and whether new pages must be requested from the operating system.

A high allocation rate can be a performance signal even when each individual allocation is cheap.

## Garbage collection finds unreachable data

Tracing garbage collectors identify objects that are reachable from a root set and reclaim objects that are not reachable.

Different collectors trade throughput, pause time, memory overhead, implementation complexity, and locality.

Generational collectors use the observation that many objects die young to collect recent allocations more frequently than long-lived regions.

## Reference counting has different trade-offs

Reference counting reclaims an object when its count reaches zero.

It can make reclamation more incremental, but updating counts adds work and cycles require additional handling.

No memory-management model removes lifetime design. It changes where that responsibility is enforced.

## GC does not mean unlimited memory

Automatic collection reclaims unreachable objects, not objects that the program still references accidentally.

Unbounded caches, retained event listeners, global collections, and growing queues can exhaust memory while every object remains technically reachable.

## Pause and throughput are separate

A collector optimized for total throughput may tolerate longer pauses. A low-pause collector can use more CPU or memory to reduce interruption.

Choose and tune only when measurements show that runtime memory management materially affects the product requirement.

## Practical guidance

Reduce accidental retention before micro-optimizing allocator calls.

Measure allocation rate, live-set size, resident memory, collection frequency, pause distribution, and application latency together.

Keep queues, caches, and other retained structures bounded even in garbage-collected runtimes.
