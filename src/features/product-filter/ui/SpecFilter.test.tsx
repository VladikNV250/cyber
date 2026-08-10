import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { CatalogFilters } from '@/entities/product';

import { useSpecFilter } from '../lib/useSpecFilter';
import { FilterItem } from '../model/types';
import { SpecFilter } from './SpecFilter';

vi.mock('../lib/useSpecFilter', () => ({
  useSpecFilter: vi.fn(),
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
      <button onClick={() => onToggle('Black', true)}>Toggle Black</button>
    </div>
  ),
}));

describe('SpecFilter', () => {
  const mockSpec: CatalogFilters['specs'][number] = {
    name: 'Color',
    options: ['Black', 'White'],
  };

  it('renders FilterCheckboxList with correct mapped items', () => {
    const toggleSpecOption = vi.fn();
    vi.mocked(useSpecFilter).mockReturnValue({
      selectedIds: ['Black'],
      toggleSpecOption,
    });

    render(<SpecFilter spec={mockSpec} />);

    expect(screen.getByTestId('filter-checkbox-list')).toBeInTheDocument();
    expect(screen.getByTestId('items-count')).toHaveTextContent('2');
    expect(screen.getByTestId('selected-ids')).toHaveTextContent('Black');
  });

  it('calls toggleSpecOption when child triggers onToggle', async () => {
    const toggleSpecOption = vi.fn();
    vi.mocked(useSpecFilter).mockReturnValue({
      selectedIds: [],
      toggleSpecOption,
    });

    render(<SpecFilter spec={mockSpec} />);

    await userEvent.click(screen.getByText('Toggle Black'));

    expect(toggleSpecOption).toHaveBeenCalledWith('Black', true);
  });
});
