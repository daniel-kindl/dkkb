---
title: "Software supply chain"
description: "The people, tools, dependencies, build systems, artifacts, and distribution steps involved in producing and delivering software."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - security
  - glossary
related:
  - security/dependency-and-supply-chain-security
sources:
  - type: primary-source
    title: "SLSA Specification v1.2"
    url: "https://slsa.dev/spec/v1.2/"
lastReviewed: "2026-09-08"
---

# Software supply chain

The software supply chain is the path from source and dependencies through build, packaging, signing, and distribution to the software a user runs.

Compromise at any stage can introduce malicious or unintended code even when the application's own source is correct.
