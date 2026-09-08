---
title: "Tool calling"
description: "A model interaction pattern in which the model requests a structured external action and the application executes it outside the model."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
aliases:
  - "function calling"
topics:
  - llm
  - agents
related:
  - ai/agent-boundaries
sources:
  - type: literature
    title: "ReAct: Synergizing Reasoning and Acting in Language Models"
    url: "https://arxiv.org/abs/2210.03629"
lastReviewed: "2026-09-08"
---

# Tool calling

Tool calling is a model interaction pattern in which the model selects an external operation and supplies structured arguments for the application to execute.

The application, not the model, owns authorization, validation, execution, and interpretation of the tool result.

Tool calling extends the model with external capabilities. It does not make the model itself a trusted execution boundary.
