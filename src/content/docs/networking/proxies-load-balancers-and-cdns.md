---
title: Proxies, load balancers, and CDNs
description: Place intermediaries in a request path deliberately for routing, policy, caching, capacity, and locality.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - networking
  - proxies
  - load-balancing
  - cdn
related:
  - networking/http-request-response-lifecycle
  - networking/http-caching
  - reliability/load-shedding-and-backpressure
  - security/defense-in-depth
sources:
  - type: primary-source
    title: "RFC 9110: HTTP Semantics"
    url: https://www.rfc-editor.org/rfc/rfc9110.html
    note: HTTP defines intermediaries including proxies, gateways, and tunnels.
  - type: primary-source
    title: "RFC 9111: HTTP Caching"
    url: https://www.rfc-editor.org/rfc/rfc9111.html
    note: HTTP caching semantics underpin many shared-cache and CDN behaviors.
lastReviewed: "2026-09-08"
---

# Proxies, load balancers, and CDNs

A network intermediary sits between a client and another server or service.

Intermediaries can centralize routing, policy, capacity management, caching, protocol translation, and locality. They also create another failure and observability boundary.

## Forward and reverse proxies

A forward proxy acts on behalf of a client when reaching other servers.

A reverse proxy accepts traffic for one or more origin services and forwards requests to selected upstreams.

The distinction is about which side the intermediary represents, not about one fixed software product.

## Load balancers distribute work

A load balancer selects an eligible backend for each connection or request according to its routing policy.

Selection can consider health, capacity, affinity, locality, weights, or other service metadata.

Load balancing does not make a backend stateless. If the application stores session state on one instance, routing policy must preserve or externalize that state explicitly.

Health signals also need care. A process that answers a shallow probe can still be unable to serve real traffic safely.

## CDNs move reusable responses closer to clients

A content delivery network places shared serving infrastructure at many network locations.

For cacheable content, the CDN can satisfy a request without contacting the origin for every request. This can reduce origin load and user latency.

A CDN does not make all content cacheable. HTTP cache directives, authorization behavior, invalidation, content variation, and privacy rules still matter.

## Intermediaries change trust boundaries

An intermediary can terminate TLS, add or remove headers, enforce authentication, normalize requests, or hide the origin network.

These capabilities are useful only when authority is explicit.

Do not trust client-controlled forwarding headers unless a known trusted intermediary overwrites or validates them.

## Failure and observability

A request can fail at the client-facing intermediary even when the origin is healthy, or at the origin while the intermediary itself is healthy.

Capture enough data to identify the hop that rejected or timed out the request. Correlation identifiers and structured access logs can help connect the path.

## Practical guidance

Add an intermediary for a concrete responsibility.

Keep routing, trust, caching, and failure behavior explicit. Avoid assuming that a reverse proxy, load balancer, and CDN are interchangeable labels merely because one product can perform several of those roles.
