---
title: Retrieval-augmented generation
description: Retrieve external knowledge for a task and provide the selected evidence to the model at generation time.
type: concept
status: draft
confidence: high
provenance:
  - literature
  - derived-guidance
topics: [llm, retrieval, rag]
related:
  - llm/context-engineering
sources:
  - type: literature
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    url: "https://arxiv.org/abs/2005.11401"
lastReviewed: "2026-09-03"
---

# Retrieval-augmented generation

Retrieval-augmented generation, or RAG, supplies external information to a model for the current task instead of relying only on model parameters.

```mermaid
flowchart LR
    Query[User or system query] --> Access[Apply access control]
    Access --> Retrieve[Retrieve candidate evidence]
    Retrieve --> Rank[Filter and rank]
    Rank --> Context[Build model context]
    Context --> Model[Generate answer]
    Model --> Verify[Verify claims against evidence]
```

Access control belongs before retrieval so unauthorized material does not enter the model context.

## Context

RAG is useful when answers depend on private data, changing information, large corpora, or evidence that should be traceable to a source.

## Failure modes

Retrieval can return irrelevant, stale, duplicated, or malicious text. A strong generator cannot recover information that retrieval failed to supply.

A system can also cite retrieved material that does not support the generated claim.

:::caution[Retrieval is not proof]
Finding a document does not mean the document is correct, current, authorized, or supportive of the generated claim. Retrieval quality and claim-to-source support need separate evaluation.
:::

## Practical guidance

Evaluate retrieval and generation separately. Preserve source identity and freshness. Apply access control before retrieval, not after generation.

Use reranking, filtering, metadata constraints, or query rewriting when they improve measured retrieval quality.

Require claim-to-source verification for high-impact outputs. RAG reduces some knowledge limitations but does not remove hallucination risk.

## Sources

- Patrick Lewis et al. "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks." 2020.
