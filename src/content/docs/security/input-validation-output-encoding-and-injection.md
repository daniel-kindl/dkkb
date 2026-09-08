---
title: Input validation, output encoding, and injection
description: Keep untrusted data separate from commands and syntax by validating structure and encoding for the destination context.
type: concept
status: reviewed
confidence: high
provenance:
  - primary-source
  - derived-guidance
topics:
  - security
  - input-validation
  - output-encoding
  - injection
related:
  - security/secure-defaults-and-fail-closed-behavior
  - security/defense-in-depth
  - api-design/api-contracts-and-compatibility
sources:
  - type: primary-source
    title: "OWASP Input Validation Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
  - type: primary-source
    title: "OWASP Injection Prevention Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Injection_Prevention_Cheat_Sheet.html
  - type: primary-source
    title: "OWASP Cross Site Scripting Prevention Cheat Sheet"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
lastReviewed: "2026-09-08"
---

# Input validation, output encoding, and injection

Input validation checks whether data has an allowed structure and meaning at a trust boundary.

Output encoding transforms data so a destination parser treats it as data rather than executable syntax.

These controls are related, but they solve different problems.

## Validate against the contract

Validation should use an allowlist of acceptable forms when the domain can define one.

Useful checks include:

- type and shape;
- length and numeric range;
- enumerated values;
- required relationships between fields;
- canonical identifiers;
- file or media constraints where uploads are accepted.

Validation should happen at the boundary where untrusted data becomes application state or an operation request.

Do not rely on client-side validation as the security boundary. A client can bypass it.

## Injection crosses a data-to-command boundary

Injection occurs when untrusted data changes the syntax or meaning of a command, query, template, interpreter input, or other structured language.

SQL injection is one example. Command injection and template injection follow the same broader failure shape.

The preferred defense is structural separation.

Use parameterized queries, safe APIs, typed builders, or fixed command structures that keep data out of executable syntax.

Escaping a manually assembled command string is more fragile because the correct rules depend on the exact parser and context.

## Encode for the output context

Output encoding is destination-specific.

Data placed in HTML text, an HTML attribute, a URL, JavaScript, CSS, or another parser context can require different encoding rules.

One generic "escape" function is therefore unsafe when the same value can enter several contexts.

Use framework or library APIs that provide context-aware escaping by default.

## Validation is not sanitization

Validation accepts or rejects a value according to a contract.

Sanitization tries to transform unsafe input into an acceptable value.

Sanitization can be appropriate for constrained rich content, but it is easy to lose meaning or miss parser edge cases. Prefer rejecting invalid structured input when transformation is not a product requirement.

## Practical guidance

Validate untrusted input from the domain contract, keep data separate from executable syntax, and encode output for the parser that will consume it.

Use [defense in depth](./defense-in-depth.md), but do not stack weak string replacements and call that a safe injection boundary.
