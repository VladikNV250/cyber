'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Slot as SlotPrimitive } from 'radix-ui';
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  forwardRef,
  ReactNode,
} from 'react';
import { cn } from '@/shared/lib/utils';

const Breadcrumb = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'nav'> & {
    separator?: ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbList = forwardRef<
  HTMLOListElement,
  ComponentPropsWithoutRef<'ol'>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      'flex flex-wrap items-center gap-1.5 wrap-break-word text-sm text-muted-foreground sm:gap-2.5',
      className,
    )}
    {...props}
  />
));
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = forwardRef<
  HTMLLIElement,
  ComponentPropsWithoutRef<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('inline-flex items-center gap-1.5', className)}
    {...props}
  />
));
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean;
    href?: string;
  }
>(({ asChild, className, ...props }, ref) => {
  if (asChild) {
    return (
      <SlotPrimitive.Slot
        ref={ref}
        className={cn('transition-colors hover:text-foreground', className)}
        {...props}
      />
    );
  }
  return (
    <Link
      ref={ref}
      className={cn('transition-colors hover:text-foreground', className)}
      {...props}
      href={props.href || '#'}
    />
  );
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn('font-normal text-foreground', className)}
    {...props}
  />
));
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: ComponentProps<'li'>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('[&>svg]:w-3.5 [&>svg]:h-3.5', className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
