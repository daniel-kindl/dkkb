---
title: Context switches and execution models
description: Understand when work stops, resumes, blocks, or yields, and why excessive runnable concurrency can add scheduling cost.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - runtime
  - context-switch
  - scheduling
  - concurrency
related:
  - runtime/processes-threads-and-scheduling
  - performance/latency-vs-throughput
  - concurrency/locks-mutexes-and-critical-sections
sources:
  - type: literature
    title: "Operating Systems: Three Easy Pieces"
    url: https://pages.cs.wisc.edu/~remzi/OSTEP/
    note: CPU virtualization and scheduling chapters describe saving and restoring execution state between runnable tasks.
lastReviewed: "2026-09-08"
---

# Context switches and execution models

A context switch changes which execution context is using a CPU.

The operating system may save the state of one thread or process and restore another so runnable work can share finite processors.

## Why switching has cost

A switch requires scheduler work and execution-state changes.

It can also disrupt CPU caches, translation caches, branch history, and locality even when the direct scheduler cost is small.

The practical cost depends on hardware, operating system, working sets, and workload.

## Blocking changes runnable state

A thread that performs blocking I/O or waits on a synchronization primitive can become non-runnable until the awaited condition changes.

The scheduler can then run another thread.

This makes threads useful for overlapping waiting with other work, but creating one thread for every potential wait can become expensive at very high concurrency.

## Runtime tasks can multiplex work

Many language runtimes provide tasks, fibers, coroutines, or async functions that can suspend without dedicating one operating-system thread to every logical operation.

These models can support large numbers of waiting operations with fewer threads.

They do not make CPU-bound work parallel automatically, and they do not remove shared-state races when several tasks can access the same mutable data.

## Excess runnable concurrency creates queueing

When many CPU-bound threads are runnable at once, they compete for processors.

More threads can then increase context switching and queueing without increasing useful throughput.

This is why concurrency limits should follow workload type and measured capacity.

## Practical guidance

Use blocking, threaded, and asynchronous execution models according to the dominant work and runtime ecosystem.

For I/O-heavy systems, measure active operations, runnable threads, queue depth, and dependency latency. For CPU-heavy systems, bound parallelism near available compute unless measurements justify another choice.

Do not treat "async" as a synonym for parallel or "threaded" as a synonym for scalable.
