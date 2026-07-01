import { Slot as SlotPrimitive } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-red-500 text-white hover:bg-red-500/90',
        outline:
          'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-muted text-foreground hover:bg-muted/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      color: {
        default: '',
        white: '',
        black: '',
      },
      size: {
        default: 'px-14 py-4 rounded-md text-base font-medium',
        sm: 'h-9 rounded-md px-3',
        lg: 'rounded-lg px-16 py-3 text-sm font-medium',
        icon: 'size-10',
      },
    },
    compoundVariants: [
      {
        variant: 'outline',
        color: 'white',
        className:
          'border-white text-white hover:bg-white hover:text-black hover:border-transparent',
      },
      {
        variant: 'default',
        color: 'white',
        className: 'bg-white text-black hover:bg-gray-100',
      },
      {
        variant: 'outline',
        color: 'black',
        className: 'border-black text-black hover:bg-black hover:text-white',
      },
      {
        variant: 'default',
        color: 'black',
        className: 'bg-black text-white hover:bg-black/90',
      },
    ],
    defaultVariants: {
      variant: 'default',
      color: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, color, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? SlotPrimitive.Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, color, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
