import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Slider } from './Slider';

describe('Slider', () => {
  it('renders a slider with min and max thumbs', () => {
    render(<Slider defaultValue={[20, 80]} />);

    // The radix slider root
    const slider = screen.getByRole('slider', { name: /minimum value/i });
    expect(slider).toBeInTheDocument();

    // In radix-ui, each thumb is a slider role itself (or part of it)
    const minThumb = screen.getByRole('slider', { name: /minimum value/i });
    const maxThumb = screen.getByRole('slider', { name: /maximum value/i });

    expect(minThumb).toBeInTheDocument();
    expect(maxThumb).toBeInTheDocument();
  });

  it('reflects default values', () => {
    render(<Slider defaultValue={[25, 75]} min={0} max={100} />);

    const minThumb = screen.getByRole('slider', { name: /minimum value/i });
    const maxThumb = screen.getByRole('slider', { name: /maximum value/i });

    expect(minThumb).toHaveAttribute('aria-valuenow', '25');
    expect(maxThumb).toHaveAttribute('aria-valuenow', '75');
  });

  it('can be disabled', () => {
    render(<Slider defaultValue={[50]} disabled />);
    const thumb = screen.getByRole('slider', { name: /minimum value/i });

    // radix sets data-disabled attribute
    expect(thumb).toHaveAttribute('data-disabled');
  });
});
