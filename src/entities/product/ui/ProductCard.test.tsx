import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  const mockProps = {
    name: 'Apple iPhone 14 Pro Max 128Gb Deep Purple',
    price: 47999,
  };

  it('renders product details correctly', () => {
    render(<ProductCard {...mockProps} />);

    // Check title
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();

    // Check formatted price (uk-UA formatting might use spaces for thousands)
    // using a regex to ignore non-breaking spaces vs regular spaces
    const priceElement = screen.getByText(/47\s*999 ₴/i);
    expect(priceElement).toBeInTheDocument();

    // Check Buy button
    expect(
      screen.getByRole('button', { name: /buy now/i }),
    ).toBeInTheDocument();
  });

  it('renders favorite button inactive by default', () => {
    render(<ProductCard {...mockProps} />);

    // Button has no aria-label currently, it's just an icon. We can select it by role
    // and check its class name. Actually better to use a querySelector if needed.
    const icon = document.querySelector('svg');
    expect(icon).toHaveAttribute('fill', 'none');
  });

  it('renders favorite button active when isFavorite is true', () => {
    render(<ProductCard {...mockProps} isFavorite={true} />);

    const icon = document.querySelector('svg');
    expect(icon).toHaveAttribute('fill', 'currentColor');
  });

  it('renders placeholder image when no imageUrl is provided', () => {
    render(<ProductCard {...mockProps} />);

    // The placeholder doesn't have an img tag, it uses a div with lucide-react ImageIcon
    const img = screen.queryByRole('img');
    expect(img).not.toBeInTheDocument();
  });

  it('renders image when imageUrl is provided', () => {
    const imageUrl = {
      src: '/test.png',
      height: 100,
      width: 100,
    } as import('next/image').StaticImageData;
    render(<ProductCard {...mockProps} imageUrl={imageUrl} />);

    const img = screen.getByRole('img', { name: mockProps.name });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src');
    // next/image might transform the src, so we just check it exists
  });
});
