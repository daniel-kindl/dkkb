---
title: "Transmission Control Protocol"
description: "A connection-oriented transport protocol that provides an ordered, reliable byte stream between endpoints."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - networking
  - glossary
aliases:
  - "TCP"
related:
  - networking/tcp-udp-and-transport-semantics
sources:
  - type: primary-source
    title: "RFC 9293: Transmission Control Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc9293.html"
lastReviewed: "2026-09-08"
---

# Transmission Control Protocol

The Transmission Control Protocol, or TCP, provides a reliable ordered byte stream between network endpoints.

TCP handles retransmission, sequencing, and flow control, but application protocols still need their own message boundaries, timeouts, and failure semantics.
