import { describe, expect, it } from 'vitest';

import { cn } from './cn';

describe('cn utility', () => {
  it('should merge tailwind classes', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
  });

  it('should combine classes conditionality', () => {
    expect(cn('text-red-500', true && 'bg-blue-500', false && 'text-xl')).toBe(
      'text-red-500 bg-blue-500',
    );
  });

  it('should handle arrays and objects', () => {
    expect(cn(['text-sm', 'font-bold'], { 'mt-4': true, 'mb-2': false })).toBe(
      'text-sm font-bold mt-4',
    );
  });

  it('should handle undefined and null gracefully', () => {
    expect(cn('px-2', undefined, null, 'py-2')).toBe('px-2 py-2');
  });
});
