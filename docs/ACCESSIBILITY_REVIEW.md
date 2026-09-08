# Accessibility review checklist

## Purpose

Use this checklist for material changes to DKKB presentation, navigation, interactive components, diagrams, or content structure.

The normative project rules are in [ACCESSIBILITY.md](ACCESSIBILITY.md). This checklist records the reusable manual checks that automated tooling cannot prove reliably.

## Representative pages

A review should include representative examples of the affected surface. For site-wide changes, include at least:

- the home page;
- a normal canonical knowledge entry with headings, links, code, and an aside;
- an entry containing a Mermaid diagram;
- the glossary browser;
- the knowledge graph;
- search/navigation behavior.

Use both light and dark themes when color, borders, focus treatment, or diagrams are affected.

## Keyboard and focus

- [ ] Reach every interactive control with the keyboard.
- [ ] Activate links, buttons, disclosure widgets, search/filter controls, and selects without a pointer.
- [ ] Verify that focus never becomes trapped.
- [ ] Verify that focus order follows the visual and semantic reading order.
- [ ] Verify a clear visible focus indicator on every interactive control.
- [ ] Verify sticky navigation or overlays do not fully hide the focused element.
- [ ] Verify skip/bypass navigation reaches the main content correctly.

## Zoom, spacing, and reflow

- [ ] Check text/content at 200% browser zoom or equivalent text resizing.
- [ ] Check a narrow viewport equivalent to 320 CSS pixels.
- [ ] Verify ordinary prose and controls do not require two-dimensional scrolling.
- [ ] Treat diagrams, code blocks, tables, and other content that inherently needs two-dimensional layout according to the WCAG reflow exceptions, while preserving an accessible way to obtain the same information.
- [ ] Apply the WCAG text-spacing overrides and verify that text is not clipped, overlapped, or lost.

The text-spacing values to exercise are:

- line height at least 1.5 times the font size;
- paragraph spacing at least 2 times the font size;
- letter spacing at least 0.12 times the font size;
- word spacing at least 0.16 times the font size.

## Semantics and assistive technology

- [ ] Verify one meaningful page title and a logical heading hierarchy.
- [ ] Verify navigation, main content, complementary content, and footer landmarks are identifiable where present.
- [ ] Verify form controls have programmatic labels.
- [ ] Verify custom interactive components expose meaningful names, roles, values, and states.
- [ ] Verify dynamic status messages are announced without forcing focus when appropriate.
- [ ] Verify decorative content is not announced unnecessarily.
- [ ] Verify interactive SVG/content does not hide interactive descendants behind an atomic image role.

## Visual contrast and non-color cues

- [ ] Verify normal text contrast is at least 4.5:1 and large text at least 3:1 where WCAG requires it.
- [ ] Verify meaningful component boundaries and graphical objects reach at least 3:1 against adjacent colors where WCAG 1.4.11 applies.
- [ ] Verify focus indicators are clearly visible against adjacent colors.
- [ ] Verify links, statuses, diagram paths, and categories do not rely on color alone.
- [ ] Repeat contrast-sensitive checks in light and dark themes.

## Content

- [ ] Meaningful images have useful text alternatives.
- [ ] Important text is not available only inside screenshots or other images of text.
- [ ] Diagrams have surrounding prose that contains their essential meaning.
- [ ] Tables use real header/data relationships rather than visual spacing.
- [ ] Link purpose is understandable from link text and context.
- [ ] Instructions do not depend only on color, position, shape, or other sensory characteristics.
- [ ] Specialized terminology and abbreviations are explained or linked to the glossary where useful.

## Current audit findings

The WCAG 2.2 baseline audit performed for issue #188 found and addressed these custom-site issues:

1. **Custom control boundaries:** the previous shared border token resolved to colors below the 3:1 non-text contrast target against the primary surface in both light and dark themes. The shared border token now uses the stronger neutral role so custom input, diagram, card, and viewport boundaries inherit sufficient separation.
2. **Knowledge-graph control borders:** graph inputs, selects, and the graph viewport used Starlight's lower-contrast gray boundary directly. They now use the DKKB semantic border token.
3. **Interactive SVG semantics:** the knowledge graph contained links inside an SVG exposed as a single `img` role. The SVG is now exposed as a labelled group so its interactive descendants remain meaningful.
4. **Knowledge-graph focus:** graph-node links now receive a strong visible focus treatment on their circles in addition to the global focus rule.
5. **Duplicate live announcements:** the textual graph relationship region no longer declares a second live region. The concise graph summary remains the live status source while the full relationship list remains normal navigable content.

No broad WCAG conformance claim follows from this audit. Automated scanning and manual checks on future changes remain required by the project accessibility standard.

## Exceptions

Do not suppress a known accessibility failure globally. Record any temporary exception with:

- the affected page or component;
- the relevant DKKB/WCAG requirement;
- why the issue cannot be fixed in the current change;
- the tracked follow-up issue;
- the narrowest possible temporary mitigation or suppression.
