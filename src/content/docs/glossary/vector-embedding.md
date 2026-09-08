---
title: "Vector embedding"
description: "A numeric vector representation that places semantically or structurally related items near one another in a learned space."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
aliases:
  - "embedding"
topics:
  - ai
  - llm
  - retrieval
related:
  - llm/retrieval-augmented-generation
sources:
  - type: literature
    title: "Efficient Estimation of Word Representations in Vector Space"
    url: "https://arxiv.org/abs/1301.3781"
lastReviewed: "2026-09-08"
---

# Vector embedding

A vector embedding represents an item as a numeric vector so relationships between items can be compared using distance or similarity measures.

Embeddings can represent text, images, users, products, or other objects. Similarity reflects what the embedding model learned, not an absolute semantic truth.

Retrieval systems often use embeddings to find candidate items that are close to a query vector.
