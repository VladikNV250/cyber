'use client';

import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Select as RadixSelect } from 'radix-ui';
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react';

import { cn } from '@/shared/lib';

const Select = RadixSelect.Root;
const SelectGroup = RadixSelect.Group;
const SelectValue = RadixSelect.Value;

const SelectTrigger = forwardRef<
  ComponentRef<typeof RadixSelect.Trigger>,
  ComponentPropsWithoutRef<typeof RadixSelect.Trigger>
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center cursor-pointer justify-between rounded-lg border border-[#D4D4D4] bg-background px-4 py-2 text-[15px] placeholder:text-muted-foreground focus:outline-none focus:border-[#A7A7A7] disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 transition-colors hover:border-[#B4B4B4]',
      className,
    )}
    {...props}
  >
    {children}
    <RadixSelect.Icon asChild>
      <ChevronDown className="size-6 text-[#9F9F9F]" strokeWidth={1} />
    </RadixSelect.Icon>
  </RadixSelect.Trigger>
));
SelectTrigger.displayName = RadixSelect.Trigger.displayName;

const SelectScrollUpButton = forwardRef<
  ComponentRef<typeof RadixSelect.ScrollUpButton>,
  ComponentPropsWithoutRef<typeof RadixSelect.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <RadixSelect.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </RadixSelect.ScrollUpButton>
));
SelectScrollUpButton.displayName = RadixSelect.ScrollUpButton.displayName;

const SelectScrollDownButton = forwardRef<
  ComponentRef<typeof RadixSelect.ScrollDownButton>,
  ComponentPropsWithoutRef<typeof RadixSelect.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <RadixSelect.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </RadixSelect.ScrollDownButton>
));
SelectScrollDownButton.displayName = RadixSelect.ScrollDownButton.displayName;

const SelectContent = forwardRef<
  ComponentRef<typeof RadixSelect.Content>,
  ComponentPropsWithoutRef<typeof RadixSelect.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <RadixSelect.Portal>
    <RadixSelect.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-32 overflow-hidden rounded-[8px] border border-[#D9D9D9] bg-background text-foreground shadow-[0px_4px_24px_rgba(0,0,0,0.06)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1 w-(--radix-select-trigger-width)',
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <RadixSelect.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)',
        )}
      >
        {children}
      </RadixSelect.Viewport>
      <SelectScrollDownButton />
    </RadixSelect.Content>
  </RadixSelect.Portal>
));
SelectContent.displayName = RadixSelect.Content.displayName;

const SelectItem = forwardRef<
  ComponentRef<typeof RadixSelect.Item>,
  ComponentPropsWithoutRef<typeof RadixSelect.Item>
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center rounded-[6px] py-2 pl-3 pr-8 text-[15px] font-medium outline-none focus:bg-[#F5F5F5] focus:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 transition-colors',
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <RadixSelect.ItemIndicator>
        <Check className="h-4 w-4" />
      </RadixSelect.ItemIndicator>
    </span>
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
  </RadixSelect.Item>
));
SelectItem.displayName = RadixSelect.Item.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
};
