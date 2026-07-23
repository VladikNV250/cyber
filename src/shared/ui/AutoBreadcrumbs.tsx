'use client';

import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './Breadcrumb';

export interface AutoBreadcrumbsProps {
  className?: string;
  labels?: Record<string, string>;
}

export function AutoBreadcrumbs({
  className,
  labels = {},
}: AutoBreadcrumbsProps) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          {segments.length === 0 ? (
            <BreadcrumbPage>Home</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join('/')}`;

          const rawLabel = labels[segment] || segment;
          const label = rawLabel.replace(/-/g, ' ');
          const formattedLabel = label.charAt(0).toUpperCase() + label.slice(1);

          return (
            <Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formattedLabel}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{formattedLabel}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
