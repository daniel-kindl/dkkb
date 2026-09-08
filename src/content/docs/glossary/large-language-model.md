---
title: Large language model
description: A language model with enough learned capacity and training scale to perform a broad range of language tasks from general instructions and context.
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
aliases:
  - LLM
topics:
  - llm
  - ai
related:
  - llm/context-engineering
  - llm/retrieval-augmented-generation
  - llm/evaluation-and-hallucination
sources:
  - type: literature
    title: "A Survey of Large Language Models"
    url: "https://arxiv.org/abs/2303.18223"
    note: The survey describes large language models, their scale, training, capabilities, adaptation, and evaluation.
lastReviewed: "2026-09-08"
---

# Large language model

A large language model, or LLM, is a language model trained at substantial scale so it can perform a broad range of language tasks from instructions and context.

The term matters because an LLM is usually used as a general model inside a larger system, not as a complete application by itself.

Prompting, retrieval, tools, structured output, evaluation, and authorization are separate system concerns. The related DKKB entries cover those engineering decisions in more depth.
