---
title: Server-side request forgery
description: Prevent untrusted input from turning a trusted server into an unrestricted network client.
type: problem
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - security
  - ssrf
  - network-boundaries
related:
  - security/least-privilege
  - security/input-validation-output-encoding-and-injection
  - security/threat-modeling
sources:
  - type: primary-source
    title: "OWASP Server Side Request Forgery Prevention Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html
lastReviewed: "2026-09-08"
---

# Server-side request forgery

Server-side request forgery occurs when an attacker can influence a server-side network request enough to reach destinations or resources that the attacker should not access directly.

The server's network position, credentials, metadata access, or trust relationships can make the forged request more powerful than a request from the attacker's own machine.

## Typical vulnerable boundary

A feature accepts a URL, hostname, callback address, import location, webhook target, image URL, or similar network destination from an untrusted source.

The application then requests that destination from a server with broader network reach.

An attacker may try to reach:

- loopback services;
- private address ranges;
- cloud instance metadata endpoints;
- internal administration services;
- alternate ports or protocols;
- redirect targets that bypass the original validation.

## Prefer allowlisted destinations

When the product only needs a known set of upstream services, define those services by configuration and let untrusted input choose only an allowed identifier or resource path.

This is safer than accepting an arbitrary URL and trying to block every dangerous destination.

If arbitrary external URLs are a genuine product requirement, the system needs stronger containment.

## Validate the resolved destination

Hostname text alone is not enough.

A hostname can resolve to different addresses over time, use IPv4 or IPv6 forms, or redirect to another target.

Validation needs to account for resolution, redirects, alternate address representations, and protocol restrictions.

Avoid validation that checks one destination and then lets a different resolver or network path make the actual request without equivalent controls.

## Restrict server network authority

[Least privilege](./least-privilege.md) applies to network reach as well as credentials.

A service that fetches external content should not automatically have access to sensitive internal networks or metadata endpoints.

Egress controls, isolated fetch services, narrow credentials, request size limits, response size limits, and bounded timeouts reduce the blast radius when URL validation is bypassed.

## Practical guidance

Do not expose a generic server-side fetch capability when the product needs only a bounded integration.

Prefer configured destinations, validate the effective destination, restrict protocols and redirects, and isolate outbound network authority.

Treat SSRF as a trust-boundary problem, not only as a string-validation problem.
