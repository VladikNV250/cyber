'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Slot as SlotPrimitive } from 'radix-ui';
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
} from 'react';

import { cn } from '@/shared/lib';

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
      'flex flex-wrap items-center gap-4 wrap-break-word text-base text-[#A4A4A4] font-medium sm:gap-4',
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
    className={cn('inline-flex items-center gap-4', className)}
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
    className={cn('text-foreground', className)}
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
    className={cn('[&>svg]:w-6 [&>svg]:h-6 stroke-1', className)}
    {...props}
  >
    {children ?? <ChevronRight className="stroke-1" />}
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
