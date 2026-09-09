---
title: Context window
description: The bounded token sequence that an LLM can process for one request, including the input and any output allowed by the model and API.
type: concept
status: draft
confidence: high
provenance:
  - primary-source
  - literature
  - derived-guidance
topics: [llm, context, tokens]
related:
  - llm/context-engineering
  - llm/retrieval-augmented-generation
sources:
  - type: primary-source
    title: "OpenAI: Text generation"
    url: "https://developers.openai.com/api/docs/guides/text"
  - type: primary-source
    title: "Anthropic: Context windows"
    url: "https://docs.anthropic.com/en/docs/build-with-claude/context-windows"
  - type: literature
    title: "Lost in the Middle: How Language Models Use Long Contexts"
    url: "https://arxiv.org/abs/2307.03172"
  - type: literature
    title: "AI Hero: What Is The Context Window?"
    url: "https://www.aihero.dev/what-is-the-context-window"
lastReviewed: "2026-09-04"
---

# Context window

A context window is the maximum amount of tokenized text and other supported input that a model can process in one request. It is a bounded working set, not a permanent memory store.

The limit belongs to a model and its serving interface. It can change between models, API modes, and provider revisions. Check the current provider documentation instead of hard-coding a limit from a different model.

## What counts toward the limit

A request can contain system instructions, conversation history, user input, retrieved documents, tool definitions, tool results, and other structured content. The model's response also consumes part of the available capacity in APIs that count input and output against one context limit.

Tokens are tokenizer-dependent units. They are not the same as characters or words. Code, punctuation, and text in different languages can use tokens at different rates. A token estimate is useful for planning, but the provider's tokenizer and request accounting are authoritative.

Some interfaces reserve an output budget before generation. This means a request can fail or be truncated even when its input appears to fit. Input limits, output limits, and total context limits are separate constraints in some APIs.

## Capacity is not effective use

A larger context window lets an application submit more material. It does not make every part of that material equally available to the model. Long inputs can contain irrelevant, duplicated, stale, or conflicting information. Research on long-context question answering also reports weaker retrieval of information placed in the middle of some long inputs.

Context size also affects cost and latency. The effect depends on the provider, model, caching behavior, and workload, so measure it in the target system.

:::caution[Do not treat the window as memory]
A model does not retain a conversation merely because it appeared in a previous request. An application must send the information again, store it externally, or summarize it. Summaries can omit constraints or change meaning, so test them for the tasks that depend on them.
:::

## When the input is too large

An application must choose a policy before a request reaches the limit. Common policies include:

- remove low-value history and duplicated material;
- retrieve a smaller set of relevant evidence;
- summarize older turns while preserving decisions and constraints;
- split the task into several model calls;
- reject the request and ask for a narrower scope.

Do not silently drop arbitrary content. Make truncation visible in logs or metadata when it can affect the result. Preserve source identity when you summarize or retrieve material so later output can be checked against the original evidence.

## Practical guidance

1. Identify the model and API-specific input, output, and total-token limits.
2. Estimate token use with the provider's tokenizer or request metadata.
3. Reserve capacity for the response and for tool calls when the interface counts them.
4. Select and order context for the current task instead of filling the window by default.
5. Test quality, cost, latency, and truncation behavior with representative long inputs.

A context window is one constraint in context engineering. The application still needs a policy for selection, ordering, persistence, and loss of context.

## Sources

- [OpenAI: Text generation](https://developers.openai.com/api/docs/guides/text)
- [Anthropic: Context windows](https://docs.anthropic.com/en/docs/build-with-claude/context-windows)
- [Nelson F. Liu et al., *Lost in the Middle: How Language Models Use Long Contexts*](https://arxiv.org/abs/2307.03172)
- [Matt Pocock, *What Is The Context Window?*](https://www.aihero.dev/what-is-the-context-window)
