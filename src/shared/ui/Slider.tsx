'use client';

import { forwardRef, ComponentRef, ComponentPropsWithoutRef } from 'react';
import { Slider as RadixSlider } from 'radix-ui';
import { cn } from '@/shared/lib';

const Slider = forwardRef<
  ComponentRef<typeof RadixSlider.Root>,
  ComponentPropsWithoutRef<typeof RadixSlider.Root>
>(({ className, ...props }, ref) => (
  <RadixSlider.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className,
    )}
    {...props}
  >
    <RadixSlider.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-[#CECECE]">
      <RadixSlider.Range className="absolute h-full bg-[#414141]" />
    </RadixSlider.Track>
    <RadixSlider.Thumb className="block h-4 w-4 rounded-full border border-primary bg-primary shadow transition-colors cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    <RadixSlider.Thumb className="block h-4 w-4 rounded-full border border-primary bg-primary shadow transition-colors cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </RadixSlider.Root>
));
Slider.displayName = RadixSlider.Root.displayName;

export { Slider };
