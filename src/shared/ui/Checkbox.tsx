'use client';

import {
  forwardRef,
  ComponentRef,
  ComponentPropsWithoutRef,
  useId,
} from 'react';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import { Check } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export const Checkbox = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    label?: React.ReactNode;
  }
>(({ className, label, id, ...props }, ref) => {
  const generatedId = useId();
  const checkboxId = id || generatedId;

  const checkbox = (
    <CheckboxPrimitive.Root
      ref={ref}
      id={checkboxId}
      className={cn(
        'peer h-3.75 w-4 shrink-0 cursor-pointer rounded-[3px] border-[0.5px] border-[#D3D3D3] bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary transition-colors hover:border-[#A7A7A7]',
        label && 'group-hover:border-[#A7A7A7]',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center text-current')}
      >
        <Check className="size-2 stroke-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (!label) {
    return checkbox;
  }

  return (
    <div className="w-max flex items-center py-1 cursor-pointer group select-none">
      {checkbox}
      <label htmlFor={checkboxId} className="cursor-pointer pl-2">
        {label}
      </label>
    </div>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
