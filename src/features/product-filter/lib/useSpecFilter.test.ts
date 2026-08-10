import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSpecFilter } from './useSpecFilter';

const mockSetQuerySpecs = vi.fn();
let mockCurrentSpecs: Record<string, string[]> = {};

vi.mock('nuqs', () => ({
  useQueryState: vi.fn(() => [mockCurrentSpecs, mockSetQuerySpecs]),
}));

describe('useSpecFilter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCurrentSpecs = {};
  });

  it('initializes with empty selectedIds when spec is not in query', () => {
    const { result } = renderHook(() => useSpecFilter('Color'));
    expect(result.current.selectedIds).toEqual([]);
  });

  it('initializes with selectedIds from query', () => {
    mockCurrentSpecs = { Color: ['Black', 'White'] };
    const { result } = renderHook(() => useSpecFilter('Color'));
    expect(result.current.selectedIds).toEqual(['Black', 'White']);
  });

  it('adds spec option when checked', () => {
    mockCurrentSpecs = { Memory: ['128GB'] };
    const { result } = renderHook(() => useSpecFilter('Color'));
    act(() => {
      result.current.toggleSpecOption('Black', true);
    });
    expect(mockSetQuerySpecs).toHaveBeenCalledWith({
      Memory: ['128GB'],
      Color: ['Black'],
    });
  });

  it('adds spec option to existing spec options', () => {
    mockCurrentSpecs = { Color: ['White'] };
    const { result } = renderHook(() => useSpecFilter('Color'));
    act(() => {
      result.current.toggleSpecOption('Black', true);
    });
    expect(mockSetQuerySpecs).toHaveBeenCalledWith({
      Color: ['White', 'Black'],
    });
  });

  it('removes spec option when unchecked', () => {
    mockCurrentSpecs = { Color: ['White', 'Black'] };
    const { result } = renderHook(() => useSpecFilter('Color'));
    act(() => {
      result.current.toggleSpecOption('Black', false);
    });
    expect(mockSetQuerySpecs).toHaveBeenCalledWith({
      Color: ['White'],
    });
  });

  it('removes spec key completely if it becomes empty', () => {
    mockCurrentSpecs = { Color: ['Black'], Memory: ['128GB'] };
    const { result } = renderHook(() => useSpecFilter('Color'));
    act(() => {
      result.current.toggleSpecOption('Black', false);
    });
    expect(mockSetQuerySpecs).toHaveBeenCalledWith({
      Memory: ['128GB'],
    });
  });

  it('sets query to null if it becomes completely empty', () => {
    mockCurrentSpecs = { Color: ['Black'] };
    const { result } = renderHook(() => useSpecFilter('Color'));
    act(() => {
      result.current.toggleSpecOption('Black', false);
    });
    expect(mockSetQuerySpecs).toHaveBeenCalledWith(null);
  });
});
