---
title: Graph and tree traversal
description: Explore reachable structure with breadth-first or depth-first traversal while making visited-state and memory trade-offs explicit.
type: concept
status: reviewed
confidence: high
provenance:
  - literature
  - derived-guidance
topics:
  - algorithms
  - bfs
  - dfs
  - traversal
related:
  - performance/bounded-work
  - architecture/architecture-boundaries-and-dependency-direction
sources:
  - type: literature
    title: "Introduction to Algorithms"
    note: Breadth-first and depth-first search are foundational graph traversal algorithms with linear work in visited vertices and edges.
lastReviewed: "2026-09-08"
---

# Graph and tree traversal

Traversal visits nodes and relationships in a structure according to a controlled exploration strategy.

Breadth-first search and depth-first search can both visit every reachable vertex in a graph, but they expose different ordering and memory behavior.

## Breadth-first search

Breadth-first search explores all nodes at one distance before moving to the next distance.

It uses a queue to hold the frontier.

In an unweighted graph, the first discovered path from the start to a vertex has the minimum number of edges.

The frontier can become wide, so memory usage can be large even when the path depth is small.

## Depth-first search

Depth-first search follows one branch until it cannot continue, then backtracks.

It can use recursion or an explicit stack.

DFS is useful for cycle detection, topological reasoning on directed acyclic graphs, connected components, and problems where deep exploration is natural.

Recursion depth itself can become a resource limit for very deep structures.

## Visited state prevents repeated work

General graphs can contain cycles and multiple paths to the same node.

A traversal that should process each vertex once needs a visited set or another domain-specific deduplication rule.

Without it, the same region can be processed repeatedly or indefinitely.

Trees do not require a visited set when the representation guarantees one parent path and no cycles.

## Complexity follows what is visited

With adjacency-list representation, standard BFS and DFS run in `O(V + E)` for the vertices and edges they actually traverse.

That is still unbounded if the reachable graph can grow without a product limit.

Production graph walks often need depth, node-count, time, or scope bounds to protect latency and memory.

## Practical guidance

Choose BFS when shortest edge count or level order matters. Choose DFS when branch exploration, post-order work, or low frontier width is more useful.

Make cycle handling and traversal limits explicit before applying either algorithm to user-controlled or externally sized graphs.
