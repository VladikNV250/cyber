import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProductSort } from './ProductSort';

const mockSetSort = vi.fn();

// Mock nuqs useQueryState
vi.mock('nuqs', () => ({
  useQueryState: vi.fn(() => ['newest', mockSetSort]),
}));

// Mock config
vi.mock('../config/sortLabels', () => ({
  DEFAULT_SORTING: 'newest',
  SORT_LABELS: {
    newest: 'Newest arrivals',
    price_asc: 'Price: Low to High',
    price_desc: 'Price: High to Low',
  },
}));

// Radix Select uses PointerEvent which is not fully supported in jsdom
if (typeof window !== 'undefined') {
  if (!window.PointerEvent) {
    window.PointerEvent = class PointerEvent extends Event {
      button: number;
      ctrlKey: boolean;
      pointerType: string;

      constructor(type: string, props: PointerEventInit = {}) {
        super(type, props);
        this.button = props.button || 0;
        this.ctrlKey = props.ctrlKey || false;
        this.pointerType = props.pointerType || 'mouse';
      }
    } as unknown as typeof window.PointerEvent;
  }
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  window.HTMLElement.prototype.releasePointerCapture = vi.fn();
  window.HTMLElement.prototype.hasPointerCapture = vi.fn();
}

describe('ProductSort', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders sort select with current value', () => {
    render(<ProductSort />);

    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();

    // It should display 'Newest arrivals' based on our mocked state
    expect(trigger).toHaveTextContent('Newest arrivals');
  });

  it('updates sort value on selection', async () => {
    const user = userEvent.setup();
    render(<ProductSort />);

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    const option = screen.getByRole('option', { name: 'Price: Low to High' });
    await user.click(option);

    expect(mockSetSort).toHaveBeenCalledWith('price_asc');
  });
});
