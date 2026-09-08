---
title: HTTP caching
description: Reuse HTTP responses safely through freshness, validation, cache keys, and explicit cache-control semantics.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - networking
  - http
  - caching
related:
  - performance/caching
  - networking/proxies-load-balancers-and-cdns
  - api-design/api-contracts-and-compatibility
sources:
  - type: primary-source
    title: "RFC 9111: HTTP Caching"
    url: https://www.rfc-editor.org/rfc/rfc9111.html
  - type: primary-source
    title: "RFC 9110: HTTP Semantics"
    url: https://www.rfc-editor.org/rfc/rfc9110.html
lastReviewed: "2026-09-08"
---

# HTTP caching

HTTP caching reuses a previous response when protocol rules allow that response to satisfy a later request.

It is a specific application of [caching](../glossary/cache.md) with standardized freshness, validation, and cache-control semantics.

## Freshness

A fresh cached response can often be reused without contacting the origin.

Freshness can come from explicit cache-control directives or other HTTP freshness rules.

Fresh does not mean globally current. It means the cache is permitted to reuse the stored response under the HTTP policy that produced it.

## Validation

A stale response does not always require downloading the full representation again.

Validators such as entity tags can let a cache ask whether its stored representation is still current. If the origin confirms that it is unchanged, the cache can reuse the existing body.

This reduces transfer while preserving the validation semantics.

## Cache keys and variation

A cache must decide which requests can share one stored response.

The effective cache key normally includes the target URI and can vary on selected request header fields.

Incorrect variation can mix responses that should remain separate. This is especially dangerous for personalized or authorization-sensitive content.

## Shared and private caches

A browser cache serves one user context. A shared cache can serve many clients.

The safe policy can differ because a response that is acceptable in one private context may expose data if reused by a shared intermediary.

Cache directives should express the intended scope instead of relying on assumptions about where a response will be stored.

## Invalidation and versioned content

Frequently changing resources may use short freshness and validation. Immutable versioned assets can often use long freshness because a content change produces a new URL.

Versioned identifiers reduce invalidation pressure because old cached representations remain correct for their old identifier.

## Practical guidance

Define what may be cached, for how long, by which cache scope, and how variation works.

Observe cache hit rate together with correctness signals. A high hit rate is not useful when the cache key can return another user's representation or when stale data violates the product contract.
