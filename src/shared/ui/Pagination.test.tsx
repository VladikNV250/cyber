import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './Pagination';

describe('Pagination', () => {
  const TestPagination = () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );

  it('renders navigation with correct role', () => {
    render(<TestPagination />);
    const nav = screen.getByRole('navigation', { name: /pagination/i });
    expect(nav).toBeInTheDocument();
  });

  it('renders active and inactive links correctly', () => {
    render(<TestPagination />);

    const activeLink = screen.getByText('2');
    const inactiveLink = screen.getByText('1');

    expect(activeLink).toHaveAttribute('aria-current', 'page');
    // active links get bg-primary from our cn() logic
    expect(activeLink).toHaveClass('bg-primary');

    expect(inactiveLink).not.toHaveAttribute('aria-current', 'page');
    expect(inactiveLink).not.toHaveClass('bg-primary');
  });

  it('renders previous and next links', () => {
    render(<TestPagination />);

    // They might be visually hidden text or aria-labels
    const prev = screen.getByLabelText(/go to previous page/i);
    const next = screen.getByLabelText(/go to next page/i);

    expect(prev).toBeInTheDocument();
    expect(next).toBeInTheDocument();
  });

  it('renders ellipsis', () => {
    render(<TestPagination />);

    const ellipsis = screen.getByText(/more pages/i);
    expect(ellipsis).toBeInTheDocument();
  });
});
