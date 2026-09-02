import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const sourceSchema = z.object({
  type: z.enum(['literature','primary-source','personal-experience','experiment','derived-guidance']),
  title: z.string().min(1),
  url: z.string().url().optional(),
  note: z.string().min(1).optional(),
});

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        description: z.string().min(1),
        type: z.enum(['index','principle','pattern','anti-pattern','problem','practice','concept','playbook','glossary','reference']),
        status: z.enum(['draft','reviewed','stable','deprecated']),
        confidence: z.enum(['low','medium','high']).optional(),
        provenance: z.array(z.enum(['literature','primary-source','personal-experience','experiment','derived-guidance'])).min(1),
        topics: z.array(z.string().min(1)).default([]),
        related: z.array(z.string().min(1)).default([]),
        sources: z.array(sourceSchema).default([]),
        lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      })
    })
  })
};
