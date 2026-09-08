---
title: Processes, threads, and scheduling
description: Separate resource isolation from execution units and understand how schedulers share finite CPU time.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - runtime
  - processes
  - threads
  - scheduling
related:
  - concurrency/locks-mutexes-and-critical-sections
  - concurrency/ordering-happens-before-and-visibility
  - performance/latency-vs-throughput
sources:
  - type: literature
    title: "Operating Systems: Three Easy Pieces"
    url: https://pages.cs.wisc.edu/~remzi/OSTEP/
    note: Arpaci-Dusseau and Arpaci-Dusseau explain process virtualization, threads, and CPU scheduling.
lastReviewed: "2026-09-08"
---

# Processes, threads, and scheduling

A process is an operating-system isolation and resource container for a running program.

A thread is an execution unit inside a process. Threads in one process normally share the process address space and many process resources.

These concepts solve different problems.

## Process boundary

A process commonly owns or references:

- a virtual address space;
- open files and other handles;
- security identity and permissions;
- environment and process metadata;
- one or more threads.

Separate processes improve fault and address-space isolation compared with threads in one process, but communication across the boundary needs an explicit inter-process mechanism.

## Thread boundary

Threads in one process can access shared memory directly.

That makes communication cheap, but it also creates concurrent shared-state risks. A memory location that can be read and written by several threads needs synchronization and visibility rules when operations are not otherwise safe.

The existing concurrency section owns [locks and critical sections](../concurrency/locks-mutexes-and-critical-sections.md) and ordering guarantees.

## Scheduler

The scheduler decides which runnable thread receives CPU time on which processor.

When runnable work exceeds available CPUs, threads take turns. Scheduling policy considers priorities, fairness, affinity, latency, and other operating-system rules.

A runnable thread is not guaranteed to run immediately.

## CPU count bounds true parallelism

A process can create many threads, but CPU-bound work cannot execute more hardware instructions in parallel than available processing resources permit.

Additional runnable threads can improve utilization when some threads block, but excessive concurrency can add queueing, memory use, lock contention, and context-switch cost.

## Practical guidance

Use processes when isolation, independent failure, privilege separation, or deployment boundaries matter.

Use threads or runtime tasks when shared-memory execution is appropriate and the concurrency model can protect shared state safely.

Size CPU-bound concurrency from available processors and measured work rather than from an arbitrary large thread count.
