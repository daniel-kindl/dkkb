---
title: Daniel Kindl Knowledge Base
description: A version-controlled knowledge base for software engineering, architecture, AI, and LLM engineering.
template: splash
hero:
  title: DKKB
  tagline: A version-controlled software engineering knowledge base for principles, architecture, patterns, decisions, AI, LLMs, and practical engineering guidance.
  actions:
    - text: Explore foundations
      link: ./principles/
      icon: right-arrow
    - text: View on GitHub
      link: https://github.com/daniel-kindl/dkkb
      icon: external
      variant: minimal
tableOfContents: false
prev: false
next: false
lastUpdated: false
editUrl: false
type: index
status: stable
provenance:
  - derived-guidance
topics:
  - software-engineering
  - knowledge-management
---

## Engineering knowledge with context

DKKB is a public, version-controlled source of software engineering knowledge. It records concepts, patterns, decisions, practices, and practical guidance from literature, primary sources, experiments, and derived reasoning.

The goal is not to collect links or universal rules. Entries explain when an idea is useful, what it costs, where it fails, and what evidence supports it.

## Start here

- **[Prefer composition over inheritance](./principles/composition-over-inheritance.md)** explains when composition gives behavior a cleaner boundary than inheritance.
- **[Strategy pattern](./patterns/strategy.md)** shows how interchangeable behavior can sit behind one stable contract.
- **[Safe online data migrations](./practices/safe-online-data-migrations.md)** describes how to change persisted representations without switching reads too early.

## Explore the knowledge base

### Foundations

[Principles](./principles/) · [Architecture](./architecture/) · [Decisions](./decisions/) · [Patterns](./patterns/) · [Anti-patterns](./anti-patterns/) · [Problems](./problems/) · [Practices](./practices/)

### Engineering

[Coding](./coding/) · [Testing](./testing/) · [Reliability](./reliability/) · [Performance](./performance/) · [Security](./security/) · [Databases](./databases/) · [API design](./api-design/)

### AI

[AI engineering](./ai/) · [LLM engineering](./llm/)

### Personal and reference

[Playbook](./playbook/) · [Glossary](./glossary/) · [References](./references/)

## How to use DKKB

Search for a concept directly or browse by area. When an entry gives guidance, read its context and trade-offs before applying it. A pattern that helps one system can add unnecessary complexity to another.
