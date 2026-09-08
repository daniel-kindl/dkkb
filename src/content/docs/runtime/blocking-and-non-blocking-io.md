---
title: Blocking and non-blocking I/O
description: Separate whether an I/O call can wait from how the application schedules other work during that wait.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - runtime
  - blocking-io
  - non-blocking-io
related:
  - runtime/system-calls-file-descriptors-and-io
  - runtime/context-switches-and-execution-models
  - reliability/timeouts
sources:
  - type: primary-source
    title: "The Open Group Base Specifications Issue 8"
    url: https://pubs.opengroup.org/onlinepubs/9799919799/
    note: POSIX specifies blocking and non-blocking behavior for files, sockets, and related interfaces.
lastReviewed: "2026-09-08"
---

# Blocking and non-blocking I/O

Blocking and non-blocking describe what an I/O operation does when it cannot make progress immediately.

They are not the same distinction as synchronous versus asynchronous application APIs, although the concepts often appear together.

## Blocking operation

A blocking read can suspend the calling thread until data, end-of-stream, timeout, signal, or another completion condition occurs.

This programming model is simple because code can continue after the operation returns.

The runtime or operating system must provide another execution context if unrelated work should continue while the thread waits.

## Non-blocking operation

A non-blocking operation returns without waiting when progress is not currently possible.

The application or runtime then needs a way to learn when the descriptor becomes ready and try again.

Event loops and readiness APIs can manage many descriptors with a small number of threads.

## Readiness is not completion

A readiness notification commonly means an operation is likely to make some progress without blocking.

It does not promise that the full application message is available or that a write can transfer every byte.

Code must still handle partial reads, partial writes, connection closure, and errors.

## Async APIs can hide non-blocking machinery

An `await`-style API may look sequential while the runtime registers asynchronous I/O and resumes the task later.

The application does not need to poll descriptors manually, but the underlying runtime still manages readiness or completion events.

## Timeouts still apply

Non-blocking I/O avoids blocking one thread. It does not guarantee that the remote peer will respond.

Each logical operation still needs a bounded [timeout](../glossary/timeout.md) or deadline when indefinite waiting is unsafe.

## Practical guidance

Prefer the execution model that the platform supports well and that keeps application invariants easy to reason about.

Use non-blocking or async I/O when concurrency scale makes one blocked thread per operation too expensive. Use blocking I/O when its simpler control flow fits the expected concurrency and resource budget.

Measure before replacing a clear blocking design with a more complex event-driven implementation.
