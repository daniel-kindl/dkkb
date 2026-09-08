import { describe, expect, it } from 'vitest';
import {
  buildFreshnessReport,
  normalizeThresholdDays,
  parseDateOnly,
} from './freshness-report.mjs';

const entry = (id, data = {}) => ({
  id,
  title: id,
  path: `src/content/docs/${id}.md`,
  type: 'concept',
  status: 'reviewed',
  lastReviewed: '2026-09-08',
  ...data,
});

describe('freshness report', () => {
  it('uses inclusive age buckets and reports threshold exceedance after the boundary', () => {
    const report = buildFreshnessReport([
      entry('testing/exact', { lastReviewed: '2026-06-10' }),
      entry('testing/older', { lastReviewed: '2026-06-09' }),
    ], {
      asOf: '2026-09-08',
      thresholdDays: [90, 180, 365],
    });

    expect(report.oldestEntries.map(({ id, ageDays, ageBucket }) => ({ id, ageDays, ageBucket }))).toEqual([
      { id: 'testing/older', ageDays: 91, ageBucket: '91-180' },
      { id: 'testing/exact', ageDays: 90, ageBucket: '0-90' },
    ]);
    expect(report.thresholds[0]).toEqual({
      thresholdDays: 90,
      count: 1,
      entries: ['testing/older'],
    });
  });

  it('excludes draft, deprecated, and index entries from freshness eligibility', () => {
    const report = buildFreshnessReport([
      entry('alpha/draft', { status: 'draft', lastReviewed: undefined }),
      entry('alpha/deprecated', { status: 'deprecated', lastReviewed: undefined }),
      entry('alpha', { type: 'index', status: 'stable', lastReviewed: undefined }),
      entry('alpha/current', { status: 'stable' }),
    ], {
      asOf: '2026-09-08',
      thresholdDays: [90],
    });

    expect(report.eligibleCount).toBe(1);
    expect(report.oldestEntries.map((item) => item.id)).toEqual(['alpha/current']);
  });

  it('surfaces missing and invalid required review dates deterministically', () => {
    const report = buildFreshnessReport([
      entry('zeta/missing', { lastReviewed: undefined }),
      entry('alpha/missing', { lastReviewed: undefined }),
      entry('beta/invalid', { lastReviewed: '2026-02-31' }),
    ], {
      asOf: '2026-09-08',
      thresholdDays: [90],
    });

    expect(report.missingRequiredReviewDates.map((item) => item.id)).toEqual([
      'alpha/missing',
      'zeta/missing',
    ]);
    expect(report.invalidReviewDates.map((item) => item.id)).toEqual(['beta/invalid']);
  });

  it('keeps oldest-entry and category ordering stable', () => {
    const report = buildFreshnessReport([
      entry('zeta/b', { lastReviewed: '2026-01-01' }),
      entry('alpha/b', { lastReviewed: '2026-01-01', status: 'stable' }),
      entry('alpha/a', { lastReviewed: '2026-01-01' }),
    ], {
      asOf: '2026-09-08',
      thresholdDays: [90, 180],
    });

    expect(report.oldestEntries.map((item) => item.id)).toEqual([
      'alpha/a',
      'alpha/b',
      'zeta/b',
    ]);
    expect(report.categories.map((item) => item.category)).toEqual(['alpha', 'zeta']);
    expect(report.statusCounts).toEqual([
      { status: 'reviewed', count: 2 },
      { status: 'stable', count: 1 },
    ]);
  });
});

describe('date and threshold parsing', () => {
  it('rejects impossible dates and normalizes explicit thresholds', () => {
    expect(parseDateOnly('2026-02-29')).toBeNull();
    expect(parseDateOnly('2024-02-29')).not.toBeNull();
    expect(normalizeThresholdDays([365, 90, 180, 90])).toEqual([90, 180, 365]);
    expect(() => normalizeThresholdDays([90, -1])).toThrow(/non-negative integers/);
  });
});
