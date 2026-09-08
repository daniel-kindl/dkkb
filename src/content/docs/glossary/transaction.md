---
title: "Transaction"
description: "A unit of database work whose operations are committed or rejected together according to the database consistency rules."
type: glossary
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - databases
  - consistency
related:
  - databases/transactions-and-consistency-boundaries
sources:
  - type: literature
    title: "Transaction Processing: Concepts and Techniques"
lastReviewed: "2026-09-08"
---

# Transaction

A transaction groups database operations into one consistency boundary that is committed or aborted according to the database's transaction rules.

Transactions let several reads and writes participate in one logical state transition. The guarantees visible to concurrent transactions depend on the selected isolation behavior.

A transaction boundary should match the invariant that must change atomically.
