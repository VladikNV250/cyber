import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { CatalogFilters } from '@/entities/product';

import { useBrandFilter } from '../lib/useBrandFilter';
import { FilterItem } from '../model/types';
import { BrandFilter } from './BrandFilter';

vi.mock('../lib/useBrandFilter', () => ({
  useBrandFilter: vi.fn(),
}));

vi.mock('./FilterCheckboxList', () => ({
  FilterCheckboxList: ({
    items,
    selectedIds,
    onToggle,
  }: {
    items: FilterItem[];
    selectedIds: string[];
    onToggle: (id: string, checked: boolean) => void;
  }) => (
    <div data-testid="filter-checkbox-list">
      <div data-testid="items-count">{items.length}</div>
      <div data-testid="selected-ids">{selectedIds.join(',')}</div>
      <button onClick={() => onToggle('apple', true)}>Toggle Apple</button>
    </div>
  ),
}));

describe('BrandFilter', () => {
  const mockBrands: CatalogFilters['brands'] = [
    { id: 'apple', name: 'Apple', _count: { products: 10 } },
    { id: 'samsung', name: 'Samsung', _count: { products: 5 } },
  ];

  it('renders FilterCheckboxList with correct mapped items', () => {
    const toggleBrandId = vi.fn();
    vi.mocked(useBrandFilter).mockReturnValue({
      brandIds: ['apple'],
      toggleBrandId,
    });

    render(<BrandFilter brands={mockBrands} />);

    expect(screen.getByTestId('filter-checkbox-list')).toBeInTheDocument();
    expect(screen.getByTestId('items-count')).toHaveTextContent('2');
    expect(screen.getByTestId('selected-ids')).toHaveTextContent('apple');
  });

  it('calls toggleBrandId when child triggers onToggle', async () => {
    const toggleBrandId = vi.fn();
    vi.mocked(useBrandFilter).mockReturnValue({
      brandIds: [],
      toggleBrandId,
    });

    render(<BrandFilter brands={mockBrands} />);

    await userEvent.click(screen.getByText('Toggle Apple'));

    expect(toggleBrandId).toHaveBeenCalledWith('apple', true);
  });
});
