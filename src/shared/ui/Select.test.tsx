import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './Select';

// Radix Select uses PointerEvent which is not fully supported in jsdom
// We mock it here to prevent errors during testing
if (typeof window !== 'undefined') {
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
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  window.HTMLElement.prototype.releasePointerCapture = vi.fn();
  window.HTMLElement.prototype.hasPointerCapture = vi.fn();
}

describe('Select', () => {
  const TestSelect = () => (
    <Select>
      <SelectTrigger aria-label="Options">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  );

  it('renders trigger with placeholder', () => {
    render(<TestSelect />);
    const trigger = screen.getByRole('combobox', { name: /options/i });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Select an option');
  });

  it('opens content and displays options on click', async () => {
    const user = userEvent.setup();
    render(<TestSelect />);

    const trigger = screen.getByRole('combobox', { name: /options/i });
    await user.click(trigger);

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();

    const option1 = screen.getByRole('option', { name: /apple/i });
    const option2 = screen.getByRole('option', { name: /banana/i });

    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  it('selects an option and updates the trigger value', async () => {
    const user = userEvent.setup();
    render(<TestSelect />);

    const trigger = screen.getByRole('combobox', { name: /options/i });
    await user.click(trigger);

    const option = screen.getByRole('option', { name: /banana/i });
    await user.click(option);

    expect(trigger).toHaveTextContent('Banana');
  });
});
