---
title: "System call"
description: "A controlled transition through which user-space code requests an operating-system kernel service."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - runtime
  - glossary
aliases:
  - "syscall"
related:
  - runtime/system-calls-file-descriptors-and-io
sources:
  - type: primary-source
    title: "The Open Group Base Specifications Issue 8"
    url: "https://pubs.opengroup.org/onlinepubs/9799919799/"
lastReviewed: "2026-09-08"
---

# System call

A system call is the controlled interface through which user-space software requests a kernel operation.

File, process, memory, and network operations commonly cross this boundary even when a language runtime hides the direct call.
