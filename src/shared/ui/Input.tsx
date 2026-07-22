import { cn } from '@/shared/lib';
import { forwardRef } from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex rounded-md border border-input bg-input-bg p-4 text-sm font-medium file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-input-placeholder transition-colors focus-visible:outline-none focus-visible:border-[#A7A7A7] disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
