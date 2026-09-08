---
title: "Inference"
description: "The execution of a trained model to produce predictions, probabilities, embeddings, or generated output from new input."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
aliases:
  - "model inference"
topics:
  - ai
  - llm
related:
  - llm/context-engineering
sources:
  - type: literature
    title: "Deep Learning"
lastReviewed: "2026-09-08"
---

# Inference

Inference is the use of a trained model to compute an output from new input without performing the model's training update process.

For a language model, inference commonly means producing probability distributions and generated tokens from the current context.

Inference cost depends on model size, input length, output length, hardware, and serving strategy.
