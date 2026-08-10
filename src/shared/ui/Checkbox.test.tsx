import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders a simple checkbox without label', () => {
    render(<Checkbox aria-label="Simple Checkbox" />);
    const checkbox = screen.getByRole('checkbox', { name: /simple checkbox/i });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('renders a checkbox with a label', () => {
    render(<Checkbox label="Accept Terms" />);
    const checkbox = screen.getByRole('checkbox', { name: /accept terms/i });
    const label = screen.getByText(/accept terms/i);

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('can be checked and unchecked by clicking the checkbox', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept Terms" />);

    const checkbox = screen.getByRole('checkbox', { name: /accept terms/i });

    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('can be checked by clicking the label', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept Terms" />);

    const label = screen.getByText(/accept terms/i);
    const checkbox = screen.getByRole('checkbox', { name: /accept terms/i });

    expect(checkbox).not.toBeChecked();

    await user.click(label);
    expect(checkbox).toBeChecked();
  });

  it('calls onCheckedChange when interacted with', async () => {
    const user = userEvent.setup();
    const handleCheckedChange = vi.fn();

    render(
      <Checkbox label="Accept Terms" onCheckedChange={handleCheckedChange} />,
    );
    const checkbox = screen.getByRole('checkbox', { name: /accept terms/i });

    await user.click(checkbox);
    expect(handleCheckedChange).toHaveBeenCalledWith(true);
  });

  it('is disabled and cannot be checked when disabled prop is true', async () => {
    const user = userEvent.setup();
    const handleCheckedChange = vi.fn();

    render(
      <Checkbox
        label="Accept Terms"
        disabled
        onCheckedChange={handleCheckedChange}
      />,
    );
    const checkbox = screen.getByRole('checkbox', { name: /accept terms/i });
    const label = screen.getByText(/accept terms/i);

    expect(checkbox).toBeDisabled();

    await user.click(label);
    expect(checkbox).not.toBeChecked();
    expect(handleCheckedChange).not.toHaveBeenCalled();
  });
});
