---
title: System calls, file descriptors, and I/O
description: Cross the application-to-kernel boundary explicitly and treat descriptors as finite references to operating-system resources.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - primary-source
  - derived-guidance
topics:
  - runtime
  - system-calls
  - file-descriptors
  - io
related:
  - performance/measure-before-optimizing
  - observability/production-debugging-with-evidence
sources:
  - type: literature
    title: "Operating Systems: Three Easy Pieces"
    url: https://pages.cs.wisc.edu/~remzi/OSTEP/
    note: The virtualization and I/O sections explain protected system calls and kernel-managed I/O resources.
  - type: primary-source
    title: "The Open Group Base Specifications Issue 8"
    url: https://pubs.opengroup.org/onlinepubs/9799919799/
    note: POSIX defines process, descriptor, file, socket, and I/O interfaces used by portable Unix-like applications.
lastReviewed: "2026-09-08"
---

# System calls, file descriptors, and I/O

Application code cannot directly perform every privileged hardware or kernel operation.

A system call crosses from user code into the operating system to request services such as file I/O, networking, process management, or memory mapping.

## System-call boundary

A system call has more overhead than an ordinary in-process function call because it crosses a protection boundary and enters kernel code.

That overhead matters when an application performs very large numbers of tiny I/O operations, but it should be measured before becoming an optimization target.

Buffering and batching can reduce repeated boundary crossings when the application contract permits them.

## File descriptor or handle

A file descriptor is a small process-local identifier used by POSIX systems to refer to an open resource.

The underlying resource can represent a regular file, socket, pipe, device, or another I/O object.

Other operating systems use different handle models, but the engineering idea is similar: the process holds a finite reference to a kernel-managed resource.

## Descriptors are finite

Open resources consume kernel and process bookkeeping.

Leaking descriptors can eventually prevent the process from opening files, accepting connections, or creating other resources.

Code should define ownership and lifetime clearly, including cleanup on errors.

## I/O can complete partially

A read or write request does not always transfer the full requested amount in one operation.

Network streams in particular have no application message boundary merely because one write call was used by the sender.

Correct code handles partial progress according to the API contract.

## Errors preserve useful categories

An I/O failure can mean end of stream, temporary unavailability, invalid descriptor, permission failure, reset connection, storage error, or another condition.

Normalizing all of these into one generic "I/O failed" message can remove evidence needed for recovery and diagnosis.

## Practical guidance

Treat descriptors and handles as owned resources with bounded lifetime.

Use maintained library abstractions for ordinary I/O, but understand which operations may block, return partial progress, or fail before the application protocol receives any data.
