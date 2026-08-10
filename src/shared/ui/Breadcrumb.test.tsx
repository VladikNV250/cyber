import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './Breadcrumb';

describe('Breadcrumb', () => {
  const TestBreadcrumb = () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/category">Category</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Current Page</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  it('renders breadcrumb navigation', () => {
    render(<TestBreadcrumb />);
    const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
    expect(nav).toBeInTheDocument();
  });

  it('renders links correctly', () => {
    render(<TestBreadcrumb />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    const categoryLink = screen.getByRole('link', { name: /category/i });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(categoryLink).toHaveAttribute('href', '/category');
  });

  it('renders the current page with aria-current="page"', () => {
    render(<TestBreadcrumb />);

    // BreadcrumbPage uses role="link" for styling/accessibility sometimes but aria-disabled
    const currentPage = screen.getByText(/current page/i);

    expect(currentPage).toBeInTheDocument();
    expect(currentPage).toHaveAttribute('aria-current', 'page');
  });

  it('renders separators', () => {
    render(<TestBreadcrumb />);

    // Separators have role="presentation" and aria-hidden="true"
    const separators = document.querySelectorAll('li[role="presentation"]');
    expect(separators.length).toBe(2);
  });
});
