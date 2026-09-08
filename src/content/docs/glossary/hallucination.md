---
title: "Hallucination"
description: "Model-generated content that is unsupported, inconsistent with the supplied evidence, or factually incorrect while presented as a plausible answer."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
aliases:
  - "LLM hallucination"
topics:
  - llm
  - evaluation
related:
  - llm/evaluation-and-hallucination
sources:
  - type: literature
    title: "Survey of Hallucination in Natural Language Generation"
    url: "https://arxiv.org/abs/2202.03629"
lastReviewed: "2026-09-08"
---

# Hallucination

Hallucination is model output that presents unsupported or incorrect content as if it were a valid continuation or answer.

The term covers several failure types, including contradiction of supplied evidence and unsupported factual claims.

Hallucination is an evaluation problem, not a single model switch. Grounding, retrieval, constraints, and verification can reduce risk but do not remove it.
