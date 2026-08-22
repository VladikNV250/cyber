import { describe, expect, it } from 'vitest';

import { formatPrice } from './formatters';

describe('formatPrice', () => {
  it('formats thousands correctly with ₴ symbol', () => {
    const result = formatPrice(10000);
    // Intl.NumberFormat might use different types of spaces (narrow no-break space, etc.)
    // so we use a regex to match any whitespace character between thousands.
    expect(result).toMatch(/10\s*000 ₴/);
  });

  it('formats zero correctly', () => {
    expect(formatPrice(0)).toBe('0 ₴');
  });

  it('formats large numbers correctly', () => {
    const result = formatPrice(1234567);
    expect(result).toMatch(/1\s*234\s*567 ₴/);
  });
});
