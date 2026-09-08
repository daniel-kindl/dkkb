---
title: Connection reuse and pooling
description: Reuse established network connections to reduce setup cost while bounding concurrency, lifetime, and stale-connection risk.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - networking
  - connection-pooling
  - keep-alive
related:
  - networking/http-request-response-lifecycle
  - networking/tls-and-transport-security
  - performance/latency-vs-throughput
  - reliability/load-shedding-and-backpressure
sources:
  - type: primary-source
    title: "RFC 9112: HTTP/1.1"
    url: https://www.rfc-editor.org/rfc/rfc9112.html
    note: HTTP/1.1 defines persistent connections and connection management behavior.
  - type: primary-source
    title: "RFC 9113: HTTP/2"
    url: https://www.rfc-editor.org/rfc/rfc9113.html
    note: HTTP/2 multiplexes many streams over a connection and changes connection-level concurrency behavior.
lastReviewed: "2026-09-08"
---

# Connection reuse and pooling

Opening a new network connection can require DNS work, a transport handshake, TLS setup, and operating-system resources.

Connection reuse keeps an established connection available for later work. A connection pool manages a bounded set of reusable connections for a destination or routing context.

## Reuse reduces setup latency

When a compatible connection already exists, a request can avoid some connection-establishment work.

This can reduce [latency](../glossary/latency.md) and CPU cost, especially when TLS handshakes would otherwise repeat frequently.

Reuse also changes failure behavior because an idle connection can become invalid before the next request uses it.

## A pool is a concurrency control

A connection pool is not only a cache of sockets.

Its maximum size can bound how many simultaneous connections a client opens to a dependency. This affects throughput, queueing, remote load, file-descriptor use, and memory.

An unbounded pool can move overload from the application into the dependency or the operating system.

A pool that is too small can create avoidable queueing and head-of-line delay.

## Protocol versions differ

HTTP/1.1 commonly needs several connections to support parallel independent requests without serializing all work on one connection.

HTTP/2 can multiplex many streams over one connection. HTTP/3 also supports independent streams through QUIC.

The right pool model therefore depends on the protocol and client implementation. Do not copy HTTP/1.1 connection counts mechanically into multiplexed protocols.

## Lifetime and stale connections

Servers, proxies, NAT devices, and load balancers can close idle connections.

A client may discover this only when it tries to reuse the connection.

Pools need policies for idle timeout, maximum lifetime, health on reuse, and replacement after failure.

Long-lived connections can also pin traffic to an old backend or network path longer than intended during deployments.

## Practical guidance

Use the platform's maintained connection manager unless the application has a measured reason to override it.

Bound pool size and waiting time. Observe active, idle, queued, opened, closed, and failed connections where the dependency is performance-sensitive.

Treat keep-alive and pooling as resource-management decisions, not as unconditional performance switches.
