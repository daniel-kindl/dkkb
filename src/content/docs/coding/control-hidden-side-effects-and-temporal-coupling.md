---
title: Control hidden side effects and temporal coupling
description: Make state changes and required operation order visible so callers can reason about behavior.
type: practice
status: draft
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - coding
  - side-effects
  - coupling
  - testing
related:
  - principles/separation-of-concerns
  - testing/deterministic-tests
  - reliability/idempotency
  - practices/safe-online-data-migrations
sources:
  - type: literature
    title: "Refactoring: Improving the Design of Existing Code"
    note: Martin Fowler describes side effects and hidden dependencies as sources of change risk and difficult reasoning.
  - type: literature
    title: "Working Effectively with Legacy Code"
    note: Michael Feathers discusses seams and dependency control for code whose behavior is difficult to isolate.
---

# Control hidden side effects and temporal coupling

Make state changes and required operation order visible to the caller.

A side effect changes state outside the returned value, such as a database write, file change, network request, event publication, clock read, or log emission. A dependency is temporally coupled when one operation works only after another operation has happened in the required order.

## Make effects visible

A function is easier to reason about when its important inputs and outputs are visible.

```ts title="notifications.ts"
async function publishPriceChange(
    event: PriceChange,
    publisher: EventPublisher,
): Promise<void>
{
    await publisher.publish(event);
}
```

The publisher is an explicit dependency and the function name describes the effect. A function that silently reads a global publisher, mutates a shared queue, or publishes as an unexpected part of `calculatePrice` hides a contract from its caller.

Pure computation is not always the goal. Effects are necessary at system boundaries. The goal is to keep them explicit, local, and testable.

## Reduce temporal coupling

Temporal coupling appears when callers must know an undocumented sequence:

1. create an object;
2. call `initialize`;
3. set a field;
4. call `start`;
5. avoid a method that is valid only after `start`.

Prefer a construction or operation contract that makes invalid order difficult to express.

```ts title="job.ts"
function startJob(config: JobConfig, clock: Clock): RunningJob
{
    const startedAt = clock.now();

    return {
        config,
        startedAt,
        state: "running",
    };
}
```

When a sequence is a real protocol, represent its states or expose one operation that owns the sequence. Do not rely only on comments that every caller must remember.

## Isolate unavoidable effects

Place effects at clear edges around a core decision:

- read external data at an adapter boundary;
- calculate domain results from explicit values;
- persist the result in a separate operation;
- publish integration events after the state change has a defined outcome.

This structure does not require separate services or strict functional programming. It reduces the number of places where hidden state and ordering can affect the result.

The [idempotency](/dkkb/reliability/idempotency/) entry is useful when an explicit effect can be retried. The [safe online data migrations](/dkkb/practices/safe-online-data-migrations/) entry shows how a multi-step operational sequence can be made visible and verifiable.

## Trade-offs

Making every effect visible can produce verbose parameter lists or abstractions that expose implementation details. Keep the contract at the level the caller needs.

A small local mutation can be clearer than copying data through several layers. A global dependency can also be reasonable for stable process-wide configuration when its lifecycle and access contract are explicit.

Do not remove all temporal order. Some protocols are inherently ordered. Make the order part of the API, state model, procedure, or test instead of leaving it as an accidental assumption.

:::caution[Logs are also effects]
Logging can change timing, volume, cost, and privacy exposure. Do not treat logging as behavior-free when diagnosing or testing a boundary.
:::

## Failure modes

Hidden effects and temporal coupling often produce:

- tests that depend on execution order or shared state;
- functions that appear to calculate but also persist or publish;
- initialization methods that callers forget;
- duplicate writes after a retry;
- race conditions around check-then-act sequences;
- changes that require edits in distant setup code.

Use [deterministic tests](/dkkb/testing/deterministic-tests/) to expose uncontrolled time, randomness, scheduling, and shared state.

## Interaction with architecture and review

An explicit effect makes dependency direction and ownership easier to review. A reviewer can ask who owns the write, whether the operation is retryable, and which state transition it represents.

A function boundary is not automatically a good architecture boundary. Use [separation of concerns](/dkkb/principles/separation-of-concerns/) when the effect and the policy have different change drivers.

## Practical guidance

When a function is difficult to test or call safely, ask:

1. Which state can it change?
2. Which dependencies does it read implicitly?
3. What must happen before and after it?
4. Can the required sequence be represented in the API or state?
5. Is the effect safe to repeat, or does it need idempotency or coordination?

Make important effects and order visible at the narrowest useful boundary.
