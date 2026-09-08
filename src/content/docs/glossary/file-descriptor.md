---
title: "File descriptor"
description: "A process-local integer handle used by POSIX systems to refer to an open file, socket, pipe, or similar I/O resource."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - runtime
  - glossary
aliases:
  - "FD"
related:
  - runtime/system-calls-file-descriptors-and-io
sources:
  - type: primary-source
    title: "The Open Group Base Specifications Issue 8"
    url: "https://pubs.opengroup.org/onlinepubs/9799919799/"
lastReviewed: "2026-09-08"
---

# File descriptor

A file descriptor, or FD, is a process-local integer that refers to an open I/O resource on POSIX systems.

Descriptors are finite resources and require lifecycle management; leaking them can prevent a process from opening new files, sockets, or pipes.
