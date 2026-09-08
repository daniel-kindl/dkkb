---
title: TLS and transport security
description: Protect network connections with authenticated encryption while keeping endpoint identity and trust assumptions explicit.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - networking
  - tls
  - encryption
related:
  - security/secure-defaults-and-fail-closed-behavior
  - security/authentication-vs-authorization
  - networking/http-request-response-lifecycle
sources:
  - type: primary-source
    title: "RFC 8446: The Transport Layer Security (TLS) Protocol Version 1.3"
    url: https://www.rfc-editor.org/rfc/rfc8446.html
lastReviewed: "2026-09-08"
---

# TLS and transport security

Transport Layer Security protects data exchanged over a network connection.

TLS can provide confidentiality, integrity, and authentication of the peer identity represented by the validated certificate and handshake.

It does not define application authorization, data-at-rest protection, or whether the authenticated endpoint is allowed to perform a business action.

## Handshake and protected traffic

Before application data is protected, the peers negotiate cryptographic parameters and establish shared traffic keys.

In the common web model, the client validates the server certificate against a trusted certification path and the requested hostname.

After the handshake, application records are encrypted and integrity-protected.

## Authentication is scoped

A valid certificate answers a narrow question: the connection reached a peer that can prove control of the certificate identity under the trust model used by the client.

It does not prove that the application is safe, that the user is authorized, or that the endpoint will return correct data.

Mutual TLS can authenticate both endpoints at the transport layer, but application policy still decides what those identities may do.

## TLS does not protect every boundary

TLS protects traffic between the endpoints of that TLS connection.

If a reverse proxy terminates TLS and opens another connection to an upstream service, the first TLS session does not automatically protect the second hop.

A system must identify each trust boundary and decide where encryption and authentication are required.

## Certificate validation is part of security

Encryption without correct peer validation can still permit interception by an attacker that can impersonate the endpoint.

Clients should not disable hostname or certificate validation to work around deployment problems.

Operational processes must also handle certificate renewal, expiry, private-key protection, and trust-store changes.

## Performance and reuse

TLS handshakes add computation and network round trips, although modern versions and session resumption reduce repeated setup cost.

Connection reuse can amortize handshake cost across many application requests.

Do not disable TLS for performance without measuring the actual bottleneck and understanding the trust boundary that would be lost.

## Practical guidance

Use maintained platform TLS implementations and secure defaults.

Treat transport security, application authentication, and authorization as separate layers. Document where TLS terminates and which network hops remain inside or outside the trusted boundary.
