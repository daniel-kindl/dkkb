import { getCollection } from 'astro:content';
import siteConfig from '../../config/site.json';
import { buildAiIndex } from '../lib/ai-index';

export const prerender = true;

export async function GET() {
  const docs = await getCollection('docs');
  const index = buildAiIndex(
    docs.map((doc) => ({
      id: doc.id,
      title: doc.data.title,
      description: doc.data.description,
      type: doc.data.type,
      status: doc.data.status,
      hidden: doc.data.sidebar?.hidden === true,
      topics: doc.data.topics ?? [],
      aliases: doc.data.aliases ?? [],
      related: doc.data.related ?? [],
    })),
    siteConfig.site,
    siteConfig.base
  );

  return new Response(`${JSON.stringify(index, null, 2)}\n`, {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
