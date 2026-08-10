import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Input } from './Input';

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toBeInTheDocument();
  });

  it('allows user to type text', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Name" />);
    const input = screen.getByPlaceholderText(/name/i);

    await user.type(input, 'John Doe');
    expect(input).toHaveValue('John Doe');
  });

  it('calls onChange handler when typed', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input placeholder="Name" onChange={handleChange} />);
    const input = screen.getByPlaceholderText(/name/i);

    await user.type(input, 'A');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Name" disabled />);
    const input = screen.getByPlaceholderText(/name/i);

    expect(input).toBeDisabled();

    // Attempting to type in a disabled input should not change value
    await user.type(input, 'A').catch(() => {});
    expect(input).toHaveValue('');
  });

  it('applies custom classNames', () => {
    render(<Input data-testid="custom-input" className="custom-class" />);
    const input = screen.getByTestId('custom-input');
    expect(input).toHaveClass('custom-class');
  });

  it('forwards refs correctly', () => {
    const ref = { current: null };
    render(<Input ref={ref} data-testid="ref-input" />);
    expect(ref.current).toBe(screen.getByTestId('ref-input'));
  });
});
