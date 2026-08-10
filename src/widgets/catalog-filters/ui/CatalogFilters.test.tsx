import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CatalogFilters as CatalogFiltersType } from '@/entities/product';

import { CatalogFilters } from './CatalogFilters';

// Mock child components
vi.mock('@/features/product-filter', () => ({
  BrandFilter: ({ brands }: { brands: unknown[] }) => (
    <div data-testid="brand-filter">Brands: {brands.length}</div>
  ),
  PriceFilter: ({ bounds }: { bounds: { min: number; max: number } }) => (
    <div data-testid="price-filter">
      Price: {bounds.min}-{bounds.max}
    </div>
  ),
  SpecFilter: ({ spec }: { spec: { name: string } }) => (
    <div data-testid={`spec-filter-${spec.name}`}>Spec: {spec.name}</div>
  ),
}));

describe('CatalogFilters', () => {
  const mockFilters: CatalogFiltersType = {
    priceRange: { min: 100, max: 2000 },
    brands: [
      { id: '1', name: 'Apple', _count: { products: 10 } },
      { id: '2', name: 'Samsung', _count: { products: 5 } },
    ],
    specs: [
      { name: 'Memory', options: ['128GB'] },
      { name: 'Color', options: ['Black'] },
    ],
  };

  it('renders all filter sections', () => {
    render(<CatalogFilters filters={mockFilters} />);

    // Price filter
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByTestId('price-filter')).toHaveTextContent(
      'Price: 100-2000',
    );

    // Brand filter
    expect(screen.getByText('Brand')).toBeInTheDocument();
    expect(screen.getByTestId('brand-filter')).toHaveTextContent('Brands: 2');

    // Spec filters
    expect(screen.getByText('Memory')).toBeInTheDocument();
    expect(screen.getByTestId('spec-filter-Memory')).toBeInTheDocument();

    expect(screen.getByText('Color')).toBeInTheDocument();
    expect(screen.getByTestId('spec-filter-Color')).toBeInTheDocument();
  });
});
