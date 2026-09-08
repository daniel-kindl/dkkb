export interface AiIndexEntryInput {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  hidden?: boolean;
  topics?: string[];
  aliases?: string[];
  related?: string[];
}

export interface AiIndexEntry {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  category: string;
  route: string;
  url: string;
  topics: string[];
  aliases: string[];
  related: string[];
}

export interface AiIndex {
  version: 1;
  site: string;
  base: string;
  source: 'canonical-markdown-frontmatter';
  entries: AiIndexEntry[];
}

const publicStatuses = new Set(['reviewed', 'stable']);

function normalizeBase(base: string): string {
  const trimmed = base.trim();
  if (!trimmed || trimmed === '/') return '/';
  return `/${trimmed.replace(/^\/+|\/+$/g, '')}/`;
}

function cleanValues(values: string[] | undefined): string[] {
  return (values ?? [])
    .map((value) => value.trim())
    .filter((value, index, all) => value.length > 0 && all.indexOf(value) === index);
}

function compareEntries(left: AiIndexEntry, right: AiIndexEntry): number {
  return left.category.localeCompare(right.category)
    || left.title.localeCompare(right.title)
    || left.id.localeCompare(right.id);
}

export function buildAiIndex(
  input: AiIndexEntryInput[],
  site: string,
  base: string
): AiIndex {
  const normalizedBase = normalizeBase(base);
  const eligible = input.filter((entry) => publicStatuses.has(entry.status) && entry.hidden !== true);
  const eligibleIds = new Set(eligible.map((entry) => entry.id));
  const origin = site.endsWith('/') ? site : `${site}/`;

  const entries = eligible.map((entry) => {
    const route = `${normalizedBase}${entry.id}/`.replace(/\/{2,}/g, '/');
    return {
      id: entry.id,
      title: entry.title,
      description: entry.description,
      type: entry.type,
      status: entry.status,
      category: entry.id.includes('/') ? entry.id.split('/', 1)[0] : 'root',
      route,
      url: new URL(route.replace(/^\//, ''), origin).toString(),
      topics: cleanValues(entry.topics),
      aliases: cleanValues(entry.aliases),
      related: cleanValues(entry.related).filter((id) => eligibleIds.has(id)).sort(),
    };
  }).sort(compareEntries);

  return {
    version: 1,
    site: origin.replace(/\/$/, ''),
    base: normalizedBase,
    source: 'canonical-markdown-frontmatter',
    entries,
  };
}

function compactNotes(entry: AiIndexEntry): string {
  const notes = [entry.description, `Type: ${entry.type}`];
  if (entry.aliases.length > 0) notes.push(`Aliases: ${entry.aliases.join(', ')}`);
  if (entry.topics.length > 0) notes.push(`Topics: ${entry.topics.join(', ')}`);
  return notes.join('. ').replace(/\.\./g, '.');
}

export function renderLlmsTxt(index: AiIndex): string {
  const groups = new Map<string, AiIndexEntry[]>();
  for (const entry of index.entries) {
    const group = groups.get(entry.category) ?? [];
    group.push(entry);
    groups.set(entry.category, group);
  }

  const lines = [
    '# DKKB',
    '',
    '> Daniel Kindl Knowledge Base for software engineering, architecture, AI, and LLM engineering.',
    '',
    'Canonical Markdown and frontmatter are authoritative. Use this file to discover relevant entries, then follow the linked canonical pages. A structured metadata index is available at dkkb-index.json.',
  ];

  for (const category of [...groups.keys()].sort()) {
    lines.push('', `## ${category}`);
    for (const entry of groups.get(category) ?? []) {
      lines.push(`- [${entry.title}](${entry.url}): ${compactNotes(entry)}`);
    }
  }

  return `${lines.join('\n')}\n`;
}
