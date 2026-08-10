import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './Accordion';

describe('Accordion', () => {
  const TestAccordion = () => (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  it('renders accordion trigger', () => {
    render(<TestAccordion />);
    const trigger = screen.getByRole('button', { name: /is it accessible\?/i });
    expect(trigger).toBeInTheDocument();
  });

  it('toggles accordion content on click', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);

    const trigger = screen.getByRole('button', { name: /is it accessible\?/i });

    // initially closed
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);

    // now open
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const content = screen.getByText(/yes\. it adheres/i);
    expect(content).toBeInTheDocument();

    await user.click(trigger);

    // closed again
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
