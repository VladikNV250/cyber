import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PriceFilter } from './PriceFilter';

// Mock the hook to isolate component testing
const mockHandleSliderChange = vi.fn();
const mockHandleMinInputChange = vi.fn();
const mockHandleMaxInputChange = vi.fn();
const mockHandleBlur = vi.fn();

vi.mock('../lib/usePriceFilter', () => ({
  usePriceFilter: vi.fn(() => ({
    localRange: { min: 100, max: 900 },
    sliderValue: [100, 900],
    handleSliderChange: mockHandleSliderChange,
    handleMinInputChange: mockHandleMinInputChange,
    handleMaxInputChange: mockHandleMaxInputChange,
    handleBlur: mockHandleBlur,
  })),
}));

// Mock the slider component to simplify testing (radix slider can be complex to interact with in jsdom)
vi.mock('@/shared/ui', () => ({
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input data-testid="mock-input" {...props} />
  ),
  Slider: (props: { onValueChange: (val: [number, number]) => void }) => (
    <div
      data-testid="mock-slider"
      onClick={() => props.onValueChange([200, 800])}
    >
      Slider
    </div>
  ),
}));

describe('PriceFilter', () => {
  const bounds = { min: 0, max: 1000 };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders inputs and labels correctly', () => {
    render(<PriceFilter bounds={bounds} />);

    expect(screen.getByText('From')).toBeInTheDocument();
    expect(screen.getByText('To')).toBeInTheDocument();

    const minInput = screen.getByLabelText(/minimum price/i);
    const maxInput = screen.getByLabelText(/maximum price/i);

    expect(minInput).toBeInTheDocument();
    expect(maxInput).toBeInTheDocument();

    // from our mock state
    expect(minInput).toHaveValue(100);
    expect(maxInput).toHaveValue(900);
  });

  it('calls input handlers when typed', async () => {
    const user = userEvent.setup();
    render(<PriceFilter bounds={bounds} />);

    const minInput = screen.getByLabelText(/minimum price/i);
    await user.type(minInput, '5');

    expect(mockHandleMinInputChange).toHaveBeenCalled();
  });

  it('calls blur handler on input blur', async () => {
    render(<PriceFilter bounds={bounds} />);

    const minInput = screen.getByLabelText(/minimum price/i);
    const maxInput = screen.getByLabelText(/maximum price/i);

    minInput.focus();
    minInput.blur();
    expect(mockHandleBlur).toHaveBeenCalledTimes(1);

    maxInput.focus();
    maxInput.blur();
    expect(mockHandleBlur).toHaveBeenCalledTimes(2);
  });

  it('calls slider handler when slider changes', async () => {
    const user = userEvent.setup();
    render(<PriceFilter bounds={bounds} />);

    const slider = screen.getByTestId('mock-slider');
    await user.click(slider);

    expect(mockHandleSliderChange).toHaveBeenCalledWith([200, 800]);
  });
});
