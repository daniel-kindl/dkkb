---
title: "Context window"
description: "The bounded amount of tokenized input and generated history a language model can use in one inference context."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
aliases:
  - "context length"
topics:
  - llm
  - ai
related:
  - llm/context-engineering
sources:
  - type: literature
    title: "Attention Is All You Need"
    url: "https://arxiv.org/abs/1706.03762"
lastReviewed: "2026-09-08"
---

# Context window

A context window is the bounded amount of tokenized information a language model can process as active context for one inference sequence.

The window can contain instructions, user input, retrieved material, tool results, and generated history.

A larger context window increases capacity, but it does not guarantee that every included detail will be used correctly or efficiently.
