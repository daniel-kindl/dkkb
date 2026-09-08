---
title: Secrets and encryption boundaries
description: Limit who can obtain sensitive credentials and distinguish protection in transit from protection of stored data.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - security
  - secrets
  - encryption
related:
  - security/least-privilege
  - security/defense-in-depth
  - security/secure-defaults-and-fail-closed-behavior
sources:
  - type: primary-source
    title: "OWASP Secrets Management Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
  - type: primary-source
    title: "OWASP Cryptographic Storage Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html
lastReviewed: "2026-09-08"
---

# Secrets and encryption boundaries

A secret is information whose disclosure grants authority or exposes protected data.

Examples include API keys, private keys, database credentials, signing keys, and access tokens.

The main security goal is not to hide the secret file path. It is to limit possession, lifetime, exposure, and use.

## Secrets need an owner and scope

Every secret should have a clear purpose and the smallest useful audience.

Do not share one broad credential across unrelated services when separate credentials can limit the blast radius.

Apply [least privilege](./least-privilege.md) to permissions associated with the credential as well as read access to the secret value.

## Avoid durable accidental copies

Secrets should not appear in:

- source control;
- public or broadly shared build artifacts;
- normal logs and tracing fields;
- crash reports sent to unrelated systems;
- command history where avoidable;
- client-side bundles unless the value is intentionally public.

A value cannot be made secret by giving it an obscure variable name after it has been shipped to an untrusted client.

## Rotation is part of the design

A credential can be compromised, expired, or intentionally replaced.

Systems should support rotation without requiring unrelated code changes.

Where feasible, support overlap between old and new credentials during controlled rotation so the process does not require one risky synchronized cutover.

## Encryption in transit and at rest

Encryption in transit protects data while it moves between the endpoints of the protected connection.

Encryption at rest protects stored representations against defined storage-access threats.

Neither control automatically protects data after an authorized process decrypts it for use.

The threat model must identify which boundary each encryption layer protects.

## Key management is part of encryption

Encryption strength does not help if the decryption key is stored next to the ciphertext with the same access controls.

Key generation, storage, rotation, backup, access policy, and destruction are part of the system design.

## Practical guidance

Reduce the number of long-lived secrets, narrow their authority, keep them out of normal artifacts and logs, and make rotation routine.

State whether an encryption control protects network transit, persistent storage, backups, application-level fields, or another boundary rather than saying only that data is "encrypted."
