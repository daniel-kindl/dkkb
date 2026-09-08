export interface SearchMetadataEntry {
  id: string;
  title: string;
  description: string;
  status: string;
  hidden?: boolean;
  aliases?: string[];
  topics?: string[];
}

export interface SearchMetadata {
  id: string;
  title: string;
  description: string;
  aliases: string[];
  topics: string[];
}

const searchableStatuses = new Set(['reviewed', 'stable']);

function cleanTerms(values: string[] | undefined): string[] {
  return (values ?? [])
    .map((value) => value.trim())
    .filter((value, index, all) => value.length > 0 && all.indexOf(value) === index);
}

export function buildSearchMetadata(entry: SearchMetadataEntry): SearchMetadata | null {
  if (!searchableStatuses.has(entry.status) || entry.hidden === true) return null;

  return {
    id: entry.id,
    title: entry.title,
    description: entry.description,
    aliases: cleanTerms(entry.aliases),
    topics: cleanTerms(entry.topics),
  };
}
