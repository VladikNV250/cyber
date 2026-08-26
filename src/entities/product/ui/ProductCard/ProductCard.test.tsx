import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CartStoreProvider } from '@/entities/cart/model/provider';

import { ProductCard } from './ProductCard';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('ProductCard', () => {
  const mockProps = {
    id: 'prod-123',
    name: 'Apple iPhone 14 Pro Max 128Gb Deep Purple',
    price: 47999,
    actionSlot: <div data-testid="action-slot">Buy</div>,
  };

  const renderComponent = (ui: React.ReactElement) => {
    return render(<CartStoreProvider skipHydration>{ui}</CartStoreProvider>);
  };

  it('renders product details correctly', () => {
    renderComponent(<ProductCard {...mockProps} />);

    // Check title
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();

    // Check formatted price (uk-UA formatting might use spaces for thousands)
    // using a regex to ignore non-breaking spaces vs regular spaces
    const priceElement = screen.getByText(/47\s*999 ₴/i);
    expect(priceElement).toBeInTheDocument();
  });

  it('renders favorite button inactive by default', () => {
    renderComponent(<ProductCard {...mockProps} />);

    // Button has no aria-label currently, it's just an icon. We can select it by role
    // and check its class name. Actually better to use a querySelector if needed.
    const icon = document.querySelector('svg');
    expect(icon).toHaveAttribute('fill', 'none');
  });

  it('renders favorite button active when isFavorite is true', () => {
    renderComponent(<ProductCard {...mockProps} isFavorite={true} />);

    const icon = document.querySelector('svg');
    expect(icon).toHaveAttribute('fill', 'currentColor');
  });

  it('renders placeholder image when no imageUrl is provided', () => {
    renderComponent(<ProductCard {...mockProps} />);

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
    renderComponent(<ProductCard {...mockProps} imageUrl={imageUrl} />);

    const img = screen.getByRole('img', { name: mockProps.name });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src');
    // next/image might transform the src, so we just check it exists
  });

  it('renders navigation links when id is provided', () => {
    renderComponent(<ProductCard {...mockProps} id="12345" />);

    // We expect the links (image link and title link) to point to /products/12345
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute('href', '/products/12345');
  });

  it('does not render navigation links when id is not provided', () => {
    renderComponent(<ProductCard {...mockProps} id={undefined} />);

    const links = screen.queryAllByRole('link');
    expect(links).toHaveLength(0);
  });
});
