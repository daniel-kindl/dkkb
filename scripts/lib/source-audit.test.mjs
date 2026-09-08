import { describe, expect, it } from 'vitest';
import { auditSourceQuality } from './source-audit.mjs';

const entry = (id, data = {}) => ({
  id,
  path: `src/content/docs/${id}.md`,
  title: id,
  type: 'concept',
  status: 'reviewed',
  confidence: 'high',
  provenance: ['derived-guidance'],
  sources: [],
  ...data,
});

describe('source quality audit', () => {
  it('reports external provenance without matching source metadata', () => {
    const report = auditSourceQuality([
      entry('alpha/external', { provenance: ['primary-source', 'derived-guidance'] }),
    ]);

    expect(report.deterministicFindings.map((item) => item.kind)).toEqual([
      'external-provenance-without-source',
      'provenance-type-without-source',
    ]);
  });

  it('reports source/provenance mismatches and exact duplicate sources', () => {
    const source = {
      type: 'primary-source',
      title: 'Protocol specification',
      url: 'https://example.com/spec',
    };
    const report = auditSourceQuality([
      entry('alpha/duplicate', {
        provenance: ['derived-guidance'],
        sources: [source, { ...source }],
      }),
    ]);

    expect(report.deterministicFindings.map((item) => item.kind)).toEqual([
      'duplicate-source',
      'source-type-missing-provenance',
    ]);
  });

  it('keeps semantic evidence concerns in the review queue', () => {
    const report = auditSourceQuality([
      entry('alpha/high-confidence'),
      entry('beta/survey', {
        provenance: ['literature', 'derived-guidance'],
        sources: [{
          type: 'literature',
          title: 'A Survey of Example Systems',
          url: 'https://example.com/survey',
        }],
      }),
      entry('gamma/draft', {
        provenance: ['primary-source'],
        sources: [{
          type: 'primary-source',
          title: 'Current draft protocol',
          url: 'https://datatracker.ietf.org/doc/draft-example-protocol/',
        }],
      }),
    ]);

    expect(report.reviewQueue.map((item) => [item.id, item.kind])).toEqual([
      ['alpha/high-confidence', 'high-confidence-evidence-review'],
      ['alpha/high-confidence', 'source-presence-review'],
      ['beta/survey', 'secondary-source-review'],
      ['gamma/draft', 'draft-specification-review'],
    ]);
  });

  it('excludes draft, deprecated, and index entries and keeps ordering deterministic', () => {
    const report = auditSourceQuality([
      entry('zeta/item'),
      entry('alpha/item'),
      entry('draft/item', { status: 'draft' }),
      entry('old/item', { status: 'deprecated' }),
      entry('alpha', { type: 'index', status: 'stable' }),
    ]);

    expect(report.eligibleCount).toBe(2);
    expect(report.reviewQueue.map((item) => [item.id, item.kind])).toEqual([
      ['alpha/item', 'high-confidence-evidence-review'],
      ['alpha/item', 'source-presence-review'],
      ['zeta/item', 'high-confidence-evidence-review'],
      ['zeta/item', 'source-presence-review'],
    ]);
  });
});
