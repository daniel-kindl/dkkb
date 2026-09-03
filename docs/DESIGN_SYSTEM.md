# Visual design system

## Purpose

DKKB uses a small visual system on top of Starlight. The site should feel technical, calm, readable, and distinct without replacing Starlight's layout or component model.

Canonical knowledge remains independent from this design system. Visual treatment must not carry meaning that is absent from the Markdown source.

## Authority

`src/styles/starlight.css` is authoritative for DKKB palette values, semantic design tokens, typography, spacing, radii, borders, and focus styling.

`public/favicon.svg` is the authoritative DKKB mark used by the generated site favicon.

`astro.config.mjs` is authoritative for Starlight integration and Mermaid behavior.

Do not copy raw palette values into components or content. Add or change a semantic token in `src/styles/starlight.css` when a new visual role is justified.

## Palette

The system uses two restrained color families:

- slate for text, surfaces, borders, and neutral hierarchy;
- blue for interactive emphasis and focus states.

Starlight's documented color custom properties map these values into its components. Dark and light themes use the same semantic roles with different palette values.

The primary semantic roles are:

- `--dkkb-color-surface`: page background;
- `--dkkb-color-surface-raised`: raised or bounded content surface;
- `--dkkb-color-border`: neutral structural border;
- `--dkkb-color-text`: primary text;
- `--dkkb-color-text-muted`: secondary text;
- `--dkkb-color-link`: inline link emphasis;
- `--dkkb-color-focus`: keyboard focus indication.

Use Starlight's own semantic tokens inside Starlight-compatible extensions when a suitable token already exists. Use a DKKB semantic token only when Starlight does not expose the needed role.

## Typography

Use the system sans-serif stack for prose and navigation. Use the system monospace stack for code and technical literals.

Do not add a web-font dependency only for branding. Long-form readability and fast rendering have priority over a distinctive typeface.

Keep Starlight's heading scale and content hierarchy unless a documented extension point makes a change necessary.

## Shape and spacing

Use the shared DKKB spacing and radius tokens for custom presentation-layer additions.

Prefer small radii and one-pixel neutral borders. Avoid decorative shadows, gradients, oversized rounding, and spacing that reduces technical information density.

Do not introduce a parallel layout scale when Starlight spacing already solves the requirement.

## Links and focus

Inline prose links use color and an underline. Color must not be the only signal that text is interactive.

Interactive controls receive a visible `:focus-visible` outline with an offset. Do not remove browser or Starlight focus behavior unless the replacement is at least as visible in both themes.

## Code, asides, and navigation

Expressive Code and Starlight remain responsible for code blocks, asides, and navigation structure. Their colors inherit the mapped Starlight theme tokens.

Do not style those features through deep internal DOM selectors. Prefer Starlight custom properties and supported component overrides.

Small selectors that target authored Markdown presentation are acceptable when no semantic custom property exists and the selector does not depend on Starlight's internal component nesting.

## Mermaid

`astro-mermaid` keeps `autoTheme: true`, so Mermaid selects a theme that follows the site theme. DKKB adds only a neutral bordered surface around rendered diagrams.

Diagram meaning must remain independent from color. Follow `docs/DIAGRAMS.md` for diagram content rules.

Review diagrams in both light and dark themes after Mermaid or Starlight upgrades because generated SVG colors are owned by the renderer.

## Brand mark

The DKKB mark is intentionally minimal. It combines a compact `DK` monogram with a blue knowledge-bar accent on a slate field.

The mark is designed to stay legible at favicon sizes. Do not create additional generated icon sizes unless a target platform requires them. Modern browsers can use the SVG favicon directly.

## Metadata and social previews

Starlight owns the normal page title, description, and Open Graph metadata derived from site configuration and page frontmatter.

Do not maintain a separate page-specific metadata layer for branding. Add a repository-owned raster social-preview image only when a concrete sharing surface requires one; do not generate unused variants preemptively.

## Extension rules

When changing site presentation:

1. Use a documented Starlight configuration option or custom property when available.
2. Add or reuse a semantic DKKB token rather than a page-specific raw value.
3. Use a supported Starlight component override only when configuration and tokens cannot express the requirement.
4. Keep canonical Markdown independent from the presentation layer.
5. Verify light and dark themes, keyboard focus, code, asides, Mermaid, desktop layout, and mobile layout.
6. Remove an override when Starlight later exposes a supported equivalent.

Do not add a component library or bespoke design framework for visual styling.

## Review widths

Use Starlight's responsive behavior and existing breakpoints. At minimum, review one representative mobile width and one desktop width before merging a material presentation change.

The repository currently owns only the deliberate content-width and table-of-contents-width adjustments described in `docs/PRESENTATION.md`. Responsive behavior otherwise remains Starlight's responsibility.

## References

- [Starlight: CSS and Styling](https://starlight.astro.build/guides/css-and-tailwind/)
- [Starlight: Configuration Reference](https://starlight.astro.build/reference/configuration/)
- [Starlight: Overriding Components](https://starlight.astro.build/guides/overriding-components/)
