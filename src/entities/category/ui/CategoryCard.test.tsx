import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CategoryCard } from './CategoryCard';

describe('CategoryCard', () => {
  const mockProps = {
    title: 'Phones',
    icon: <svg data-testid="mock-icon" />,
    href: '/catalog/phones',
  };

  it('renders title and icon', () => {
    render(<CategoryCard {...mockProps} />);

    expect(screen.getByText('Phones')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('renders a link with the correct href', () => {
    render(<CategoryCard {...mockProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/catalog/phones');
  });
});
