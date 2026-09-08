---
title: "Leader election"
description: "A coordination process that selects one participant to act as leader for a defined term, epoch, or responsibility."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - distributed-systems
  - glossary
related:
  - distributed-systems/leader-election-and-consensus
sources:
  - type: primary-source
    title: "In Search of an Understandable Consensus Algorithm"
    url: "https://raft.github.io/raft.pdf"
lastReviewed: "2026-09-08"
---

# Leader election

Leader election selects one participant to coordinate a defined responsibility for a bounded term or epoch.

A safe design must prevent stale or partitioned leaders from continuing to act with authority after ownership has moved.
