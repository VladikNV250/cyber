'use client';

import { cn } from '@/shared/lib';

import { useCartStore } from '../model/provider';
import { selectCartTotalItems } from '../model/selectors';

interface Props {
  className?: string;
}

export function TotalItemsBadge({ className }: Props) {
  const totalItems = useCartStore(selectCartTotalItems);

  if (totalItems === 0) return null;

  return (
    <span
      className={cn(
        'absolute -top-1 -right-1 flex h-5 min-w-5 px-1 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white',
        className,
      )}
    >
      {totalItems > 99 ? '99+' : totalItems}
    </span>
  );
}
