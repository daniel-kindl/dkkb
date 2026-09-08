---
title: "Token"
description: "A discrete unit of text produced by a tokenizer and processed as one symbol by a language model."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
aliases:
  - "LLM token"
topics:
  - llm
  - ai
related:
  - llm/context-engineering
sources:
  - type: literature
    title: "Neural Machine Translation of Rare Words with Subword Units"
    url: "https://arxiv.org/abs/1508.07909"
lastReviewed: "2026-09-08"
---

# Token

A token is one discrete symbol produced by a tokenizer for model input or output.

Tokens can represent whole words, word fragments, punctuation, bytes, or other units depending on the tokenizer.

Token count affects context usage, inference cost, and output limits. A token is not the same as a character or a word.
