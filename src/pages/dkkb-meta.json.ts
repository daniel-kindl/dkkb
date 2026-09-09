import packageJson from '../../package.json';
import { getCollection } from 'astro:content';
import { buildSiteMetadata } from '../lib/site-metadata';

export const prerender = true;

const version = packageJson.version;

function environment(name: string): string | null {
  return process.env[name]?.trim() || null;
}

function buildTimestamp(): string | null {
  const sourceDateEpoch = environment('SOURCE_DATE_EPOCH');
  if (!sourceDateEpoch) return null;
  const timestamp = Number(sourceDateEpoch);
  if (!Number.isInteger(timestamp) || timestamp < 0) {
    throw new Error('SOURCE_DATE_EPOCH must be a non-negative integer.');
  }
  return new Date(timestamp * 1000).toISOString();
}

export async function GET() {
  const docs = await getCollection('docs');
  const metadata = buildSiteMetadata({
    version,
    release: environment('DKKB_RELEASE'),
    commit: environment('DKKB_COMMIT'),
    buildTimestamp: buildTimestamp(),
    contentCount: docs.length,
    glossaryCount: docs.filter((doc) => doc.data.type === 'glossary').length,
  });

  return new Response(`${JSON.stringify(metadata, null, 2)}\n`, {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
