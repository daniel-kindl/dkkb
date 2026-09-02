import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://daniel-kindl.github.io',
  base: '/dkkb',
  integrations: [
    starlight({
      title: 'DKKB',
      description: 'Daniel Kindl Knowledge Base for software engineering, architecture, AI, and LLM engineering.',
      editLink: { baseUrl: 'https://github.com/daniel-kindl/dkkb/edit/main/' },
      lastUpdated: true,
      social: { github: 'https://github.com/daniel-kindl/dkkb' },
      sidebar: [
        { label: 'Foundations', items: [
          { label: 'Principles', autogenerate: { directory: 'principles' } },
          { label: 'Architecture', autogenerate: { directory: 'architecture' } },
          { label: 'Patterns', autogenerate: { directory: 'patterns' } },
          { label: 'Anti-patterns', autogenerate: { directory: 'anti-patterns' } },
          { label: 'Problems', autogenerate: { directory: 'problems' } },
          { label: 'Practices', autogenerate: { directory: 'practices' } }
        ]},
        { label: 'Engineering', items: [
          { label: 'Coding', autogenerate: { directory: 'coding' } },
          { label: 'Testing', autogenerate: { directory: 'testing' } },
          { label: 'Reliability', autogenerate: { directory: 'reliability' } },
          { label: 'Performance', autogenerate: { directory: 'performance' } },
          { label: 'Security', autogenerate: { directory: 'security' } },
          { label: 'Databases', autogenerate: { directory: 'databases' } },
          { label: 'API design', autogenerate: { directory: 'api-design' } }
        ]},
        { label: 'AI', items: [
          { label: 'AI engineering', autogenerate: { directory: 'ai' } },
          { label: 'LLM engineering', autogenerate: { directory: 'llm' } }
        ]},
        { label: 'Personal', items: [{ label: 'Playbook', autogenerate: { directory: 'playbook' } }] },
        { label: 'Reference', items: [
          { label: 'Glossary', autogenerate: { directory: 'glossary' } },
          { label: 'References', autogenerate: { directory: 'references' } }
        ]}
      ]
    })
  ]
});
