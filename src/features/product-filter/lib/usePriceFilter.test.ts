import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { usePriceFilter } from './usePriceFilter';

// Mock nuqs useQueryState
const mockSetMinPrice = vi.fn();
const mockSetMaxPrice = vi.fn();

vi.mock('nuqs', () => ({
  useQueryState: vi.fn((key) => {
    if (key === 'minPrice') return [null, mockSetMinPrice];
    if (key === 'maxPrice') return [null, mockSetMaxPrice];
    return [null, vi.fn()];
  }),
}));

// Mock useDebounceFn from @reactuses/core to execute immediately
vi.mock('@reactuses/core', () => ({
  useDebounceFn: (fn: (...args: unknown[]) => unknown) => {
    return {
      run: (...args: unknown[]) => fn(...args),
    };
  },
}));

describe('usePriceFilter', () => {
  const defaultBounds = { min: 0, max: 1000 };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with default bounds', () => {
    const { result } = renderHook(() => usePriceFilter(defaultBounds));

    expect(result.current.localRange).toEqual(defaultBounds);
  });

  it('updates local range and query range on slider change', () => {
    const { result } = renderHook(() => usePriceFilter(defaultBounds));

    act(() => {
      result.current.handleSliderChange([100, 900]);
    });

    expect(result.current.localRange).toEqual({ min: 100, max: 900 });
    expect(mockSetMinPrice).toHaveBeenCalledWith(100);
    expect(mockSetMaxPrice).toHaveBeenCalledWith(900);
  });

  it('updates min value on min input change', () => {
    const { result } = renderHook(() => usePriceFilter(defaultBounds));

    act(() => {
      result.current.handleMinInputChange({
        target: { value: '200' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.localRange).toEqual({ min: '200', max: 1000 });
    expect(mockSetMinPrice).toHaveBeenCalledWith(200);
  });

  it('updates max value on max input change', () => {
    const { result } = renderHook(() => usePriceFilter(defaultBounds));

    act(() => {
      result.current.handleMaxInputChange({
        target: { value: '800' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.localRange).toEqual({ min: 0, max: '800' });
    expect(mockSetMaxPrice).toHaveBeenCalledWith(800);
  });

  it('clamps negative values to bounds.min on debounce', () => {
    const { result } = renderHook(() => usePriceFilter(defaultBounds));

    act(() => {
      result.current.handleMinInputChange({
        target: { value: '-500' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // localRange allows the string while typing
    expect(result.current.localRange).toEqual({ min: '-500', max: 1000 });
    // URL gets clamped to 0
    expect(mockSetMinPrice).toHaveBeenCalledWith(0);
  });

  it('clamps excessively large values to bounds.max on debounce', () => {
    const { result } = renderHook(() => usePriceFilter(defaultBounds));

    act(() => {
      result.current.handleMaxInputChange({
        target: { value: '999999' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.localRange).toEqual({ min: 0, max: '999999' });
    // URL gets clamped to 1000
    expect(mockSetMaxPrice).toHaveBeenCalledWith(1000);
  });

  it('handles min > max edge case by capping min to max', () => {
    const { result } = renderHook(() => usePriceFilter({ min: 0, max: 1000 }));

    act(() => {
      // Set min greater than max (1000)
      result.current.handleMinInputChange({
        target: { value: '2000' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // URL min should be capped to current max (1000)
    expect(mockSetMinPrice).toHaveBeenCalledWith(1000);
  });

  it('formats inputs strictly on handleBlur', () => {
    const { result } = renderHook(() => usePriceFilter(defaultBounds));

    act(() => {
      result.current.handleMinInputChange({
        target: { value: '-10' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.localRange.min).toBe('-10');

    act(() => {
      result.current.handleBlur();
    });

    // localRange is clamped back to 0
    expect(result.current.localRange).toEqual({ min: 0, max: 1000 });
  });

  it('provides safe sliderValue even if inputs are out of bounds', () => {
    const { result } = renderHook(() => usePriceFilter(defaultBounds));

    act(() => {
      result.current.handleMinInputChange({
        target: { value: '99999' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.sliderValue).toEqual([1000, 1000]); // min capped at max
  });
});
