---
title: TCP, UDP, and transport semantics
description: Choose transport guarantees from application needs for ordering, reliability, latency, and message boundaries.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - networking
  - tcp
  - udp
  - transport
related:
  - reliability/timeouts
  - reliability/retries-and-exponential-backoff
  - networking/http-request-response-lifecycle
sources:
  - type: primary-source
    title: "RFC 9293: Transmission Control Protocol (TCP)"
    url: https://www.rfc-editor.org/rfc/rfc9293.html
  - type: primary-source
    title: "RFC 768: User Datagram Protocol"
    url: https://www.rfc-editor.org/rfc/rfc768.html
lastReviewed: "2026-09-08"
---

# TCP, UDP, and transport semantics

TCP and UDP provide different transport contracts above IP.

Neither protocol is universally faster or better. The application must choose the guarantees it needs and account for the behavior it does not receive automatically.

## TCP provides an ordered byte stream

TCP establishes a connection and presents an ordered stream of bytes.

It detects loss, retransmits missing data, removes duplicate transport segments, and applies flow and congestion control.

The application does not receive the original packet boundaries. If an application needs messages, it must define framing above the byte stream.

Reliable delivery also does not mean infinite waiting. A connection can stall or break, and an application still needs bounded [timeouts](../glossary/timeout.md).

## UDP provides datagrams

UDP sends discrete datagrams without establishing a TCP-style connection.

The transport does not guarantee delivery, ordering, duplicate suppression, retransmission, or congestion behavior for the application.

Those properties may be unnecessary for some workloads, or they may be implemented by a higher-level protocol that uses UDP as its substrate.

## Head-of-line behavior

TCP preserves byte-stream order. If earlier bytes are missing, later bytes cannot be delivered to the application as if the gap did not exist.

This protects ordering but can delay independent higher-level work when many logical operations share one stream.

Modern protocols can address this in different ways. For example, HTTP/3 uses QUIC over UDP and defines its own reliable streams so loss in one stream does not block delivery in another stream in the same way.

## Reliability belongs to the full protocol stack

UDP does not imply unreliable application behavior. A protocol above UDP can implement acknowledgement, retransmission, encryption, congestion control, and ordered streams.

Likewise, TCP does not make an application operation exactly once. A connection can fail after the server commits an operation but before the client receives the response.

Application retries still need [idempotency](../glossary/idempotency.md) when duplicate effects are possible.

## Practical guidance

Choose the transport from the required semantics and the higher-level protocol already in use.

For normal HTTP application development, use the protocol stack supplied by the platform rather than selecting raw TCP or UDP directly.

When diagnosing behavior, separate transport delivery guarantees from application operation guarantees. They solve different problems.
