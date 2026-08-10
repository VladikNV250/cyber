import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CatalogProduct } from '@/entities/product';

import { CatalogGrid } from './CatalogGrid';

// Mock child components
vi.mock('./CatalogGridEmpty', () => ({
  CatalogGridEmpty: () => <div data-testid="empty-state">Empty</div>,
}));

vi.mock('./CatalogGridHeader', () => ({
  CatalogGridHeader: ({ total }: { total: number }) => (
    <div data-testid="grid-header">Total: {total}</div>
  ),
}));

vi.mock('./CatalogPagination', () => ({
  CatalogPagination: ({
    page,
    totalPages,
  }: {
    page: number;
    totalPages: number;
  }) => (
    <div data-testid="pagination">
      Page {page} of {totalPages}
    </div>
  ),
}));

vi.mock('@/entities/product', () => ({
  ProductCard: ({ name, price }: { name: string; price: number }) => (
    <div data-testid="product-card">
      {name} - {price}
    </div>
  ),
}));

describe('CatalogGrid', () => {
  const buildPageUrl = vi.fn();

  const metadata = {
    page: 1,
    limit: 10,
    total: 2,
    totalPages: 1,
  };

  const products: CatalogProduct[] = [
    { id: '1', name: 'Phone 1', minPrice: 1000 } as CatalogProduct,
    { id: '2', name: 'Phone 2', minPrice: 2000 } as CatalogProduct,
  ];

  it('renders the header with total count', () => {
    render(
      <CatalogGrid
        products={products}
        metadata={metadata}
        buildPageUrl={buildPageUrl}
      />,
    );
    expect(screen.getByTestId('grid-header')).toHaveTextContent('Total: 2');
  });

  it('renders products when they exist', () => {
    render(
      <CatalogGrid
        products={products}
        metadata={metadata}
        buildPageUrl={buildPageUrl}
      />,
    );
    const cards = screen.getAllByTestId('product-card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Phone 1 - 1000');
    expect(cards[1]).toHaveTextContent('Phone 2 - 2000');
  });

  it('renders empty state when products are empty', () => {
    render(
      <CatalogGrid
        products={[]}
        metadata={{ ...metadata, total: 0 }}
        buildPageUrl={buildPageUrl}
      />,
    );
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.queryByTestId('product-card')).not.toBeInTheDocument();
  });

  it('renders pagination when totalPages > 1', () => {
    const multiPageMeta = { ...metadata, totalPages: 5, page: 2 };
    render(
      <CatalogGrid
        products={products}
        metadata={multiPageMeta}
        buildPageUrl={buildPageUrl}
      />,
    );

    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveTextContent('Page 2 of 5');
  });

  it('does not render pagination when totalPages is 1 or less', () => {
    render(
      <CatalogGrid
        products={products}
        metadata={metadata}
        buildPageUrl={buildPageUrl}
      />,
    );
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });
});
