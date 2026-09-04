# DKKB

A public, version-controlled software-engineering knowledge base built on Astro/Starlight. Content lives as Markdown entries with structured frontmatter under `src/content/docs/`; `docs/CONTENT_MODEL.md` defines the frontmatter fields themselves. This glossary covers terms about entry *behavior* that the frontmatter fields don't spell out on their own.

## Language

**Homepage eligibility**:
Whether an entry is *allowed* to appear in a homepage section at all: not an `index` entry, status `reviewed` or `stable`, and not sidebar-hidden. A fixed rule of the domain, independent of whether any given entry actually asks to be shown.
*Avoid*: Promotable (conflates eligibility with the separate act of requesting promotion)

**Homepage promotion**:
An entry's own request to appear in a homepage section, declared via `homepage.startHere` or `homepage.featured` in its frontmatter. A promoted entry must also be homepage-eligible; the two are independent checks answering different questions ("does it want to be shown" vs. "is it allowed to be shown").
*Avoid*: Promotable, isPromoted (as a stand-in for eligibility)
