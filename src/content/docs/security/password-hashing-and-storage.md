---
title: Password hashing and storage
description: Store password verifiers with slow password-hashing functions rather than reversible encryption or fast general-purpose hashes.
type: practice
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - security
  - passwords
  - password-hashing
related:
  - security/authentication-vs-authorization
  - security/secrets-and-encryption-boundaries
sources:
  - type: primary-source
    title: "OWASP Password Storage Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
  - type: primary-source
    title: "RFC 9106: Argon2 Memory-Hard Function for Password Hashing and Proof-of-Work Applications"
    url: https://www.rfc-editor.org/rfc/rfc9106.html
lastReviewed: "2026-09-08"
---

# Password hashing and storage

A service that authenticates passwords normally needs to verify a future password attempt. It does not need to recover the original password.

Passwords should therefore be stored as outputs from a purpose-built password-hashing function, not with reversible encryption and not with a fast general-purpose hash alone.

## Password hashing should be intentionally expensive

Attackers that obtain a password database can try candidate passwords offline.

A password-hashing function raises the cost of each guess through configurable CPU and memory work.

Modern recommendations commonly prefer memory-hard functions such as Argon2id when the platform supports them safely.

The work factor should be selected so legitimate authentication remains acceptable while offline guessing becomes more expensive.

## Salt

A unique random salt is combined with each password before hashing.

The salt does not need to be secret.

Its purpose is to prevent identical passwords from producing the same stored verifier and to stop attackers from reusing one precomputed table across many accounts.

Modern password-hashing libraries normally manage salts as part of their encoded output format.

## Pepper

A pepper is an optional additional secret shared outside the password database.

It can add another barrier when the database alone is compromised, but it introduces secret-management and rotation complexity.

A pepper does not replace a proper password-hashing function or unique salts.

## Rehash on successful authentication

Password-hashing parameters can become too weak as hardware changes.

Store enough metadata to identify the algorithm and parameters used for each verifier.

After a successful login, the service can compute a new verifier with current parameters when an upgrade is required.

This supports gradual migration without knowing users' original passwords in advance.

## Do not log passwords

The plaintext password exists briefly during authentication and should not be logged, traced, stored in analytics, or copied into error reports.

Transport protection is also required so credentials are not exposed before they reach the verifier.

## Practical guidance

Use a maintained password-hashing library and current platform guidance.

Prefer passwordless authentication when it fits the product, but when passwords are accepted, store one-way adaptive verifiers with unique salts and explicit upgrade policy.
