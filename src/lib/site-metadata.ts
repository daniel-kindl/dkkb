export interface SiteMetadataInput {
  version: string;
  release: string | null;
  commit: string | null;
  buildTimestamp: string | null;
  contentCount: number;
  glossaryCount: number;
}

export interface SiteMetadata {
  schema: 1;
  application: 'dkkb';
  version: string;
  release: string | null;
  commit: string | null;
  build_timestamp: string | null;
  content: {
    entries: number;
    glossary_entries: number;
  };
}

export function buildSiteMetadata(input: SiteMetadataInput): SiteMetadata {
  if (!input.version.trim()) {
    throw new Error('Site metadata requires a version.');
  }

  return {
    schema: 1,
    application: 'dkkb',
    version: input.version.trim(),
    release: input.release?.trim() || null,
    commit: input.commit?.trim() || null,
    build_timestamp: input.buildTimestamp?.trim() || null,
    content: {
      entries: input.contentCount,
      glossary_entries: input.glossaryCount,
    },
  };
}
