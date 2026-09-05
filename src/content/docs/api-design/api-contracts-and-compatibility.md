---
title: API contracts and compatibility
description: Define the promise an API makes to its clients, and change it without breaking the code that already depends on it.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - primary-source
  - derived-guidance
topics:
  - api-design
  - contracts
  - compatibility
  - coupling
related:
  - api-design/resource-and-operation-design
  - api-design/api-versioning-and-evolution
  - api-design/error-modeling-and-normalization
  - patterns/provider-neutral-integration-boundaries
  - architecture/architecture-boundaries-and-dependency-direction
sources:
  - type: primary-source
    title: "RFC 9110: HTTP Semantics"
    url: "https://www.rfc-editor.org/rfc/rfc9110"
    note: The IETF defines the shared semantics that clients and servers rely on, including methods, status codes, and representation metadata.
  - type: primary-source
    title: "Hyrum's Law"
    url: "https://www.hyrumslaw.com/"
    note: Hyrum Wright states that with enough users, every observable behavior of an interface becomes something a client depends on, whether or not the contract promised it.
  - type: literature
    title: "Architectural Styles and the Design of Network-based Software Architectures"
    note: Roy Fielding defines REST and the role of uniform interfaces and self-descriptive messages in independent evolution. Doctoral dissertation, University of California, Irvine, 2000.
lastReviewed: "2026-09-05"
---

# API contracts and compatibility

An API contract is the promise a service makes to its clients about how to call it and what to expect back.

The contract covers the operations, the inputs they accept, the outputs they return, the errors they can raise, and the guarantees around them.

The contract is the real coupling point between two systems. A client depends on the contract, not on the server's internal code.

This is what lets each side change independently, as long as the contract holds.

## What the contract includes

A contract is more than a list of fields. It normally covers:

- the operations a client can call and their meaning;
- the request shape: required and optional inputs, types, and constraints;
- the response shape: fields, types, and which fields are guaranteed present;
- the error model: which failures are possible and how a client tells them apart;
- behavioral guarantees such as ordering, idempotency, and consistency;
- non-functional limits such as size caps, rate limits, and timeouts.

A guarantee that clients cannot observe is not part of the useful contract. A behavior that clients can observe becomes part of the contract in practice, even when the documentation does not mention it.

:::note[Observed behavior becomes contract]
Hyrum's Law states that with enough clients, every observable behavior of an interface will be depended on by someone.

Undocumented ordering, timing, or error text can become a de facto contract that a change then breaks.
:::

## Backward and forward compatibility

Two directions of compatibility matter.

- Backward compatible: a new server still satisfies clients written for the old contract. Old callers keep working.
- Forward compatible: an old peer still works when it meets a newer peer, because each side ignores the parts of a change it does not understand.

A compatible change adds capability without invalidating existing callers. A breaking change removes, renames, or redefines something an existing caller relies on.

Common compatible changes:

- add a new optional request field with a safe default;
- add a new field to a response;
- add a new operation;
- add a new optional error case that old clients map to a general failure.

Common breaking changes:

- remove or rename a field or operation;
- make an optional input required;
- narrow an accepted input range or tighten validation;
- change a field's type, units, or meaning;
- change default behavior that clients relied on.

## Client and server responsibilities

The server owns the contract and its stability. It must not change observable behavior in a way that breaks a conforming client without an explicit evolution step.

The client should depend only on the documented contract. Two client-side rules keep compatibility possible:

- Ignore unknown fields rather than reject them. This lets the server add fields without breaking the client.
- Do not depend on incidental behavior such as field order, whitespace, undocumented error strings, or timing.

This division follows the robustness principle: a server should be strict about what it produces, and a client should tolerate additions it does not yet understand.

The principle has limits. A server that silently accepts malformed input can hide errors and create its own compatibility trap, because clients then depend on the lenient behavior.

## Trade-offs

A strict contract with tight validation catches client errors early and keeps behavior predictable. It also makes some later changes breaking, because tightening validation further can reject inputs that used to pass.

A permissive contract accepts more inputs and is easier to extend, but it pushes ambiguity onto every client and can mask defects.

A rich contract that exposes many fields and guarantees is convenient for clients. Each exposed detail is also a promise that constrains future change, as Hyrum's Law describes.

The stable choice is usually a small, explicit contract: expose what clients need, keep guarantees you can hold, and avoid leaking internal representation that you may want to change.

## Common failure modes

- Treating an internal model as the external contract. When the API returns the database row directly, a schema change becomes a breaking API change.
- Assuming a change is safe because the documentation did not promise the old behavior. Clients may depend on the observed behavior anyway.
- Tightening validation and calling it a bug fix. Rejecting previously accepted input breaks existing callers.
- Reusing a field for a new meaning. Old clients still read it with the old meaning.
- Relying on clients to reject unknown fields, then discovering that adding a field breaks them.

## Relationships to other boundaries

An API contract is one case of a designed boundary. The architecture boundaries entry covers the direction of dependencies across such edges.

The provider-neutral integration boundary entry covers owning a contract at the application edge, so that a provider's shape does not define the domain.

A stable contract is also a reliability concern. Clients build retries, timeouts, and idempotency on top of the guarantees the contract states.

A contract that hides its failure and idempotency semantics forces every client to guess.

When a change must break the contract, the versioning and evolution entry covers how to introduce it without a coordinated flag day.

## Sources

- Internet Engineering Task Force. "RFC 9110: HTTP Semantics." 2022.
- Hyrum Wright. "Hyrum's Law." Accessed 2026.
- Roy T. Fielding. "Architectural Styles and the Design of Network-based Software Architectures." Doctoral dissertation, University of California, Irvine, 2000.
