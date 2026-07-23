import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { ComponentProps, forwardRef } from 'react';

import { cn } from '@/shared/lib';

import { type ButtonProps, buttonVariants } from './Button';

const Pagination = ({ className, ...props }: ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = forwardRef<HTMLUListElement, ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn('flex flex-row items-center gap-2', className)}
      {...props}
    />
  ),
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = forwardRef<HTMLLIElement, ComponentProps<'li'>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props} />
  ),
);
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & ComponentProps<'a'> &
  ButtonProps;

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'default' : 'ghost',
        size,
      }),
      'w-9 h-9 rounded-md',
      isActive
        ? 'bg-primary text-primary-foreground hover:bg-primary/85'
        : 'text-foreground bg-accent hover:bg-accent/60 hover:text-accent-foreground',
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  className,
  ...props
}: ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="icon"
    className={cn('p-0 mr-2 bg-transparent', className)}
    {...props}
  >
    <ChevronLeft className="size-6 stroke-1" />
    <span className="sr-only">Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
  className,
  ...props
}: ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="icon"
    className={cn('p-0 ml-2 bg-transparent', className)}
    {...props}
  >
    <span className="sr-only">Next</span>
    <ChevronRight className="size-6 stroke-1" />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  ...props
}: ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn(
      'flex h-9 w-9 items-end justify-center -mb-3 text-[#737373]',
      className,
    )}
    {...props}
  >
    <MoreHorizontal className="size-6" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
