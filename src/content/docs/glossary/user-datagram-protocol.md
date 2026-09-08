---
title: "User Datagram Protocol"
description: "A connectionless transport protocol that sends independent datagrams without guaranteeing delivery, ordering, or duplicate suppression."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - networking
  - glossary
aliases:
  - "UDP"
related:
  - networking/tcp-udp-and-transport-semantics
sources:
  - type: primary-source
    title: "RFC 768: User Datagram Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc768.html"
lastReviewed: "2026-09-08"
---

# User Datagram Protocol

The User Datagram Protocol, or UDP, sends independent datagrams without establishing a reliable ordered stream.

Applications using UDP must tolerate or implement any delivery, ordering, congestion, or retry behavior that their protocol requires.
