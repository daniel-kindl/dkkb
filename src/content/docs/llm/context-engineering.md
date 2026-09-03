---
title: Context engineering for LLM systems
description: Deliberately select and structure the information a model receives instead of treating the context window as an unbounded memory store.
type: concept
status: draft
confidence: high
provenance:
  - derived-guidance
topics: [llm, context, prompting]
related: []
sources: []
lastReviewed: "2026-09-03"
---

# Context engineering for LLM systems

An LLM can only reason from the information available in its active context and learned parameters. More context is not automatically better context.

## Design goals

Provide the information needed for the current task, make instructions and data distinguishable, and remove irrelevant material that competes for attention.

Useful context can include task instructions, authoritative reference material, tool results, prior decisions, examples, and explicit output constraints.

## Failure modes

Large context can contain stale, conflicting, duplicated, or low-value information. Important instructions can become difficult to locate, and token cost and latency increase.

A model can also treat untrusted retrieved text as instructions unless the application separates data from control clearly.

## Practical guidance

Select context for the current decision. Prefer authoritative and recent material. Preserve provenance for retrieved facts. Summarize history only when the summary keeps the constraints needed for later work.

Treat context construction as application logic that requires tests and evaluation, not as a prompt-writing afterthought.
