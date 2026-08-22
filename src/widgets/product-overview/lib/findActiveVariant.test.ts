import { describe, expect, it } from 'vitest';

import type { ProductVariant } from '@/entities/product';

import { findActiveVariant } from './findActiveVariant';

const mockVariants = [
  {
    id: 'v1',
    price: 1000,
    attributes: { color: 'Black', storage: '128GB' },
  },
  {
    id: 'v2',
    price: 1200,
    attributes: { color: 'White', storage: '256GB' },
  },
  {
    id: 'v3',
    price: 1400,
    attributes: { color: 'Black', storage: '256GB' },
  },
] as unknown as ProductVariant[];

describe('findActiveVariant', () => {
  it('returns null if variants array is empty or undefined', () => {
    expect(findActiveVariant([], {})).toBeNull();
  });

  it('finds exact matching variant', () => {
    const selectedOptions = { color: 'White', storage: '256GB' };
    const variant = findActiveVariant(mockVariants, selectedOptions);
    expect(variant?.id).toBe('v2');
  });

  it('falls back to the first variant if no exact match is found', () => {
    const selectedOptions = { color: 'Red', storage: '512GB' };
    const variant = findActiveVariant(mockVariants, selectedOptions);
    expect(variant?.id).toBe('v1');
  });

  it('ignores null values in selectedOptions and matches partially', () => {
    // If a param is null (not in URL), it shouldn't block finding a match
    // if the other attributes match.
    const selectedOptions = { color: 'Black', storage: null };
    const variant = findActiveVariant(mockVariants, selectedOptions);
    // Since 'v1' is the first black one that satisfies color: 'Black' (storage is ignored since null),
    // it returns v1.
    expect(variant?.id).toBe('v1');
  });
});
