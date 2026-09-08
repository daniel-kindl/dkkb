---
title: Graphs
description: Model entities and arbitrary relationships through vertices and edges, then choose representation from traversal and density needs.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - data-structures
  - graphs
  - traversal
related:
  - architecture/architecture-boundaries-and-dependency-direction
sources:
  - type: literature
    title: "Introduction to Algorithms"
    note: Cormen and coauthors cover graph representations and fundamental traversal algorithms.
lastReviewed: "2026-09-08"
---

# Graphs

A graph represents entities as vertices and relationships as edges.

Edges can be directed or undirected, weighted or unweighted, and may carry their own domain data.

Graphs are useful when relationships are not naturally a single hierarchy.

## Representation changes cost

An adjacency list stores, for each vertex, the neighbors connected to it.

This is space-efficient for sparse graphs and supports efficient traversal of outgoing edges.

An adjacency matrix stores a cell for each possible vertex pair. It can answer direct edge-existence checks quickly but uses space proportional to the square of the vertex count.

The right representation depends on graph density and the operations that dominate.

## Traversal follows relationships

Breadth-first search explores neighbors by increasing path depth from a starting vertex.

Depth-first search follows one path deeply before backtracking.

Both can visit all reachable vertices and edges in time proportional to the graph representation they traverse.

They answer different questions and produce different traversal orders.

## Cycles are normal

Unlike trees, general graphs can contain cycles.

Traversal therefore needs a visited-state rule or another mechanism that prevents infinite repetition when revisiting vertices is not meaningful.

Directed acyclic graphs are a special case that support topological ordering.

## Graph shape can reveal architecture problems

Dependency graphs, build graphs, service graphs, and ownership graphs can expose cycles, high fan-out, and central nodes.

The data structure itself does not decide whether a relationship is healthy. The domain defines which graph properties are allowed.

## Practical guidance

Use a graph when relationships are first-class and can connect entities in arbitrary ways.

Choose adjacency representation from expected density and query patterns. Define whether repeated edges, self-edges, cycles, and disconnected components are valid before implementing graph operations.
