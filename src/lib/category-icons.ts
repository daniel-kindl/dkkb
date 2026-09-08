import type { StarlightIcon } from '@astrojs/starlight/types';

const categoryIcons: Record<string, StarlightIcon> = {
  principles: 'star',
  architecture: 'puzzle',
  decisions: 'question-circle',
  patterns: 'random',
  'anti-patterns': 'warning',
  problems: 'error',
  practices: 'approve-check-circle',
  coding: 'code-branch',
  algorithms: 'analytics',
  concurrency: 'random',
  'distributed-systems': 'server',
  testing: 'approve-check',
  delivery: 'rocket',
  infrastructure: 'server',
  reliability: 'heart',
  messaging: 'comment-alt',
  observability: 'analytics',
  performance: 'analytics',
  runtime: 'setting',
  security: 'padlock',
  databases: 'database',
  'data-structures': 'list-format',
  'api-design': 'link-alt',
  networking: 'link',
  ai: 'star',
  llm: 'comment',
  'product-design': 'figma',
  playbook: 'open-book',
  glossary: 'open-book',
  references: 'notes',
};

export function categoryIconFor(entryId: string): StarlightIcon {
  return categoryIcons[entryId] ?? 'open-book';
}
