# Accessibility standard

## Purpose

DKKB is a public technical knowledge base. Accessibility is part of content quality and site quality, not a separate optional feature.

DKKB uses the W3C Recommendation for [WCAG 2.2](https://www.w3.org/TR/WCAG22/) as its normative external reference.

Until every applicable Level A and Level AA success criterion has been verified for the claimed scope, DKKB describes itself as **WCAG 2.2 AA-aligned** rather than WCAG 2.2 AA conformant.

## Conformance model

DKKB follows these rules:

- satisfy every WCAG 2.2 Level A and Level AA success criterion that applies to the generated site and published content;
- document criteria that are not applicable to the current product instead of silently ignoring them;
- treat selected Level AAA practices as additional DKKB guidance without claiming AAA conformance;
- prefer fixes in shared Astro/Starlight components or theme configuration over page-specific patches;
- keep canonical Markdown understandable when Starlight styling or client-side enhancements are unavailable;
- use automated checks as regression detection, not as proof of WCAG conformance.

A conformance claim may be added only after the full applicable A/AA set has been evaluated for the scope named in that claim.

## Required DKKB rules

| Area | WCAG 2.2 | DKKB requirement |
| --- | --- | --- |
| Text alternatives | 1.1.1 | Meaningful non-text content has an equivalent text alternative. Decorative images use an empty alternative where applicable. |
| Structure and relationships | 1.3.1, 1.3.2 | Use semantic headings, lists, tables, landmarks, and a meaningful reading order. Visual layout must not be the only source of structure. |
| Sensory characteristics | 1.3.3 | Instructions do not depend only on shape, color, position, sound, or other sensory characteristics. |
| Orientation and input purpose | 1.3.4, 1.3.5 | Do not unnecessarily lock orientation. When user-input fields are introduced, expose recognized input purposes where applicable. |
| Color | 1.4.1 | Color is never the only way to communicate meaning. |
| Contrast | 1.4.3, 1.4.11 | Normal text has at least 4.5:1 contrast, large text at least 3:1, and meaningful UI/graphical boundaries at least 3:1 where WCAG requires it. |
| Text resizing and reflow | 1.4.4, 1.4.10, 1.4.12 | Content remains usable at 200% text resize, under WCAG text-spacing overrides, and at the 320 CSS-pixel reflow equivalent without general two-dimensional scrolling. |
| Images of text | 1.4.5 | Prefer real text. Do not use screenshots or generated images as the only representation of important text. |
| Hover/focus content | 1.4.13 | Additional content shown on hover or focus is dismissible, hoverable where required, and remains available long enough to use. |
| Keyboard | 2.1.1, 2.1.2 | Every interactive function is keyboard-operable and no component traps keyboard focus. |
| Bypass blocks | 2.4.1 | Repeated navigation can be bypassed, normally through Starlight's skip-link/landmark behavior. |
| Page and section identification | 2.4.2, 2.4.6 | Pages have descriptive titles and sections use descriptive headings or labels. |
| Focus navigation | 2.4.3, 2.4.7, 2.4.11 | Focus order is logical, focus is visibly indicated, and sticky content does not fully hide the focused component. |
| Link purpose and discovery | 2.4.4, 2.4.5 | Link purpose is understandable from its text/context and substantial content has more than one practical discovery path, such as navigation plus search. |
| Pointer input | 2.5.1, 2.5.2, 2.5.8 | Do not require complex gestures when a simple alternative is possible, avoid accidental pointer activation, and keep interactive targets at least 24 by 24 CSS pixels or satisfy the WCAG spacing exception. |
| Language | 3.1.1, 3.1.2 | Set the page language correctly and identify passages in another human language when needed. |
| Consistency | 3.2.3, 3.2.4 | Repeated navigation and components remain consistently ordered, identified, and named. |
| Accessible components | 4.1.2 | Interactive components expose correct names, roles, values, and states. Prefer native HTML before ARIA. |
| Status messages | 4.1.3 | Dynamic status messages that do not receive focus are exposed to assistive technology when applicable. |

The absence of a success criterion from this table does not waive it if it becomes applicable to DKKB.

## Content-authoring rules

Canonical knowledge must follow these accessibility rules:

- use one logical heading hierarchy; do not choose heading levels for visual size;
- use descriptive link text instead of generic text such as "click here" when the destination or purpose is not otherwise clear;
- give meaningful images useful alternative text;
- keep decorative images non-announcing where the rendering mechanism allows it;
- explain the essential meaning of diagrams in surrounding prose;
- never depend on diagram color alone to distinguish states, paths, categories, or outcomes;
- use real lists and tables for list/tabular relationships instead of visual alignment with spaces;
- include table headers when a table represents data relationships;
- do not place important prose only inside screenshots;
- avoid instructions that depend only on position or appearance, such as "use the green option on the right";
- explain unusual engineering terms when the audience may not know them, preferably through the canonical glossary;
- expand or explain abbreviations on first meaningful use when the abbreviation is not already clear from context or linked glossary material.

## Diagrams and visual technical content

Mermaid and static diagrams supplement written explanations. They do not replace the prose needed to understand the concept.

A diagram should use labels and relationships that remain understandable without color. Static images require useful alternative text when they carry information. Complex visuals may use concise alternative text plus a nearby prose description rather than attempting to encode the entire visual in one `alt` value.

## Selected AAA practices

DKKB intentionally adopts parts of Level AAA that fit a technical knowledge base:

- **2.4.8 Location:** make a reader's location in the knowledge hierarchy understandable through navigation, breadcrumbs, category context, or equivalent mechanisms;
- **2.4.10 Section Headings:** use section headings to organize substantial content;
- **3.1.3 Unusual Words:** explain specialized or unusual terminology, with the glossary as the preferred reusable mechanism;
- **3.1.4 Abbreviations:** provide expansions or explanations for abbreviations when needed;
- **1.4.8 Visual Presentation:** apply the parts that improve long-form readability, especially restrained line length and avoiding unnecessarily justified text.

These are project practices. They do not constitute a WCAG AAA conformance claim.

## Currently non-applicable criteria

The current DKKB site is primarily static documentation and does not presently include these product capabilities:

- prerecorded or live synchronized audio/video media;
- time limits or time-sensitive user tasks;
- authentication or identification flows;
- financial or legal transactions;
- user-submitted forms that create records or trigger consequential actions;
- drag-only interactions;
- multi-step data-entry processes;
- user-generated content.

Success criteria whose triggering feature is absent are currently not applicable. If DKKB gains one of these features, the relevant WCAG criteria become part of the required design and review scope before the feature is considered complete.

## Verification

Accessibility verification has three layers:

1. **Shared implementation:** Astro/Starlight components, theme tokens, and custom components implement accessible semantics and interaction once for all pages.
2. **Automated checks:** deterministic rules run locally and in CI to catch machine-detectable regressions.
3. **Manual review:** keyboard navigation, focus visibility, reflow/zoom, text spacing, screen-reader-oriented semantics, diagram alternatives, and other criteria that automation cannot reliably prove are checked manually on representative pages.

A passing automated scanner does not prove WCAG conformance.

## Automated verification

The repository uses the Deque axe rules engine through a pinned `@axe-core/cli` invocation. The automated audit scans representative generated pages for WCAG 2.x Level A and AA rules, including WCAG 2.1 and 2.2 rule tags.

The representative set currently covers:

- the home page;
- the glossary browser;
- the knowledge graph;
- a normal entry containing a Mermaid diagram.

Each route is scanned in the default rendering and with Chrome's dark rendering preference forced. Confirmed violations fail the command and therefore fail the repository quality gate.

Use:

```text
pnpm check:accessibility
```

to build the site and run the accessibility audit locally. If `dist` already contains the exact build to inspect, use:

```text
pnpm audit:accessibility
```

The scanner version is exact in the audit runner so CI does not silently move to a newer rules engine. Broad rule suppression is not allowed. A necessary exception must be narrow, documented, and tracked according to [the accessibility review checklist](ACCESSIBILITY_REVIEW.md).

Automated scanning cannot reliably prove keyboard workflow quality, screen-reader usability, meaningful alternative-text quality, diagram equivalence, 200% zoom behavior, 320 CSS-pixel reflow, text-spacing resilience, or other criteria that require human judgment. These remain manual requirements.

## Manual review baseline

For material UI or presentation changes, review representative pages with:

- keyboard-only navigation;
- visible focus and focus-not-obscured behavior;
- light and dark themes;
- 200% text resize/zoom behavior;
- narrow reflow equivalent to 320 CSS pixels;
- WCAG text-spacing overrides where practical;
- a screen-reader-oriented inspection of landmarks, headings, names, roles, and dynamic status behavior when custom interactive components change;
- diagrams, code blocks, tables, asides, search, glossary browsing, and other affected custom components.

Known exceptions must be documented with a reason and tracked rather than hidden through broad suppressions.
