import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

describe('Tabs', () => {
  const TestTabs = () => (
    <Tabs defaultValue="tab1">
      <TabsList aria-label="test tabs">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
    </Tabs>
  );

  it('renders tabs list and triggers', () => {
    render(<TestTabs />);

    expect(
      screen.getByRole('tablist', { name: /test tabs/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /tab 1/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /tab 2/i })).toBeInTheDocument();
  });

  it('renders the default active tab content', () => {
    render(<TestTabs />);

    const tab1 = screen.getByRole('tab', { name: /tab 1/i });
    expect(tab1).toHaveAttribute('data-state', 'active');
    expect(screen.getByText('Content 1')).toBeInTheDocument();

    // Content 2 should not be visible (or present depending on radix config, usually hidden)
    const content2 = screen.queryByText('Content 2');
    expect(content2).not.toBeInTheDocument();
  });

  it('switches tabs on click', async () => {
    const user = userEvent.setup();
    render(<TestTabs />);

    const tab2 = screen.getByRole('tab', { name: /tab 2/i });
    await user.click(tab2);

    expect(tab2).toHaveAttribute('data-state', 'active');
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('supports disabled tabs', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" disabled>
            Tab 2
          </TabsTrigger>
        </TabsList>
      </Tabs>,
    );

    const tab2 = screen.getByRole('tab', { name: /tab 2/i });
    expect(tab2).toBeDisabled();
  });
});
