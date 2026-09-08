---
title: "Retrieval-augmented generation"
description: "A pattern that retrieves external information for a request and supplies it to a generative model as context."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
aliases:
  - "RAG"
topics:
  - llm
  - retrieval
related:
  - llm/retrieval-augmented-generation
sources:
  - type: literature
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    url: "https://arxiv.org/abs/2005.11401"
lastReviewed: "2026-09-08"
---

# Retrieval-augmented generation

Retrieval-augmented generation, or RAG, retrieves external information relevant to a request and supplies that information to a generative model.

Retrieval can improve freshness, provenance, and task-specific grounding without changing the model's learned parameters.

RAG does not guarantee correctness. Retrieval quality, context construction, and answer evaluation remain separate engineering concerns.
