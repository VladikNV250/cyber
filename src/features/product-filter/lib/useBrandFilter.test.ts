import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useBrandFilter } from './useBrandFilter';

const mockSetBrandIds = vi.fn();
let mockCurrentBrandIds: string[] = [];

vi.mock('nuqs', () => ({
  useQueryState: vi.fn(() => [mockCurrentBrandIds, mockSetBrandIds]),
}));

describe('useBrandFilter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCurrentBrandIds = [];
  });

  it('initializes with current brand ids', () => {
    mockCurrentBrandIds = ['1', '2'];
    const { result } = renderHook(() => useBrandFilter());
    expect(result.current.brandIds).toEqual(['1', '2']);
  });

  it('adds brand id when checked', () => {
    const { result } = renderHook(() => useBrandFilter());
    act(() => {
      result.current.toggleBrandId('1', true);
    });
    expect(mockSetBrandIds).toHaveBeenCalledWith(['1']);
  });

  it('removes brand id when unchecked', () => {
    mockCurrentBrandIds = ['1', '2'];
    const { result } = renderHook(() => useBrandFilter());
    act(() => {
      result.current.toggleBrandId('1', false);
    });
    expect(mockSetBrandIds).toHaveBeenCalledWith(['2']);
  });

  it('sets value to null when removing the last brand id', () => {
    mockCurrentBrandIds = ['1'];
    const { result } = renderHook(() => useBrandFilter());
    act(() => {
      result.current.toggleBrandId('1', false);
    });
    expect(mockSetBrandIds).toHaveBeenCalledWith(null);
  });
});
