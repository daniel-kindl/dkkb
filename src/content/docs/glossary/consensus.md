---
title: "Consensus"
description: "A distributed coordination problem in which participating nodes agree on one value or ordered decision despite failures within stated assumptions."
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

# Consensus

Consensus is the problem of getting distributed participants to agree on a decision despite failures allowed by the protocol model.

Consensus protocols define safety and progress conditions; they do not remove network partitions or make arbitrary failures harmless.
