---
title: "Password hashing"
description: "The use of a deliberately expensive one-way password hashing function with a unique salt to store password verifiers."
type: glossary
status: reviewed
confidence: high
provenance:
  - primary-source
topics:
  - security
  - glossary
related:
  - security/password-hashing-and-storage
sources:
  - type: primary-source
    title: "OWASP Password Storage Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html"
lastReviewed: "2026-09-08"
---

# Password hashing

Password hashing derives a verifier from a password using a purpose-built, deliberately expensive one-way function and a unique salt.

It is different from reversible encryption because a password database should not need the original plaintext password to verify a login.
