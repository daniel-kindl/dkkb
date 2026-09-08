import { describe, expect, it } from 'vitest';
import { categoryIconFor } from './category-icons';

describe('categoryIconFor', () => {
  it('maps DKKB category ids to stable Starlight icons', () => {
    expect(categoryIconFor('architecture')).toBe('puzzle');
    expect(categoryIconFor('coding')).toBe('code-branch');
    expect(categoryIconFor('databases')).toBe('database');
    expect(categoryIconFor('security')).toBe('padlock');
    expect(categoryIconFor('testing')).toBe('approve-check');
    expect(categoryIconFor('product-design')).toBe('figma');
  });

  it('uses a safe generic fallback for new categories', () => {
    expect(categoryIconFor('future-category')).toBe('open-book');
  });
});
