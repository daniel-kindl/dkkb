---
title: Session management
description: Bind authenticated activity to short-lived server policy without exposing reusable session authority unnecessarily.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - security
  - sessions
  - authentication
related:
  - security/authentication-vs-authorization
  - security/least-privilege
  - security/secure-defaults-and-fail-closed-behavior
sources:
  - type: primary-source
    title: "OWASP Session Management Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
lastReviewed: "2026-09-08"
---

# Session management

A session associates a sequence of requests with authenticated or otherwise stateful server-side context.

The session identifier is often a bearer credential: possession can be enough to act as the session until the server rejects or expires it.

Its confidentiality, unpredictability, lifetime, and revocation behavior are therefore security properties.

## Session identifier

A session identifier should be generated with sufficient unpredictability and should not embed sensitive business data that the client does not need to know.

When cookies carry the identifier, browser controls such as `Secure`, `HttpOnly`, and appropriate `SameSite` policy reduce exposure at common browser boundaries.

The application still needs XSS and CSRF defenses where relevant.

## Authentication state can change

A session created before login can receive greater authority after login.

Regenerate or rotate the session identifier when privilege changes so an attacker cannot preselect or preserve an identifier across the transition.

The same reasoning applies to sensitive elevation flows.

## Expiry and inactivity

Sessions should have explicit lifetime policy.

Useful controls can include:

- idle timeout;
- absolute maximum lifetime;
- expiry after sensitive account events;
- server-side revocation;
- reauthentication for high-risk operations.

Long sessions reduce login friction but increase the window in which a stolen session remains useful.

## Logout must remove authority

A client deleting its local cookie is not enough when the server continues to accept the underlying session token.

The server-side authority must expire or be revoked according to the session model.

For stateless signed tokens, revocation can require shorter token lifetimes, server-side deny state, key rotation, or another explicit design.

## Session data and authorization

Authentication state should identify the subject and relevant assurance state.

Authorization should still evaluate whether that subject may perform the requested operation against current policy and resource state.

Do not treat a session flag such as `isAdmin` as a permanent replacement for authoritative authorization rules when privileges can change.

## Practical guidance

Treat session identifiers as credentials.

Minimize their lifetime and exposure, rotate on privilege changes, provide server-side invalidation where the threat model needs it, and require fresh authorization at sensitive operations.
