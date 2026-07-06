import { cn } from '@/shared/lib/utils';
import { forwardRef } from 'react';

export type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mx-auto w-full max-w-[1120px] px-4 md:px-0', className)}
        {...props}
      />
    );
  },
);
Container.displayName = 'Container';

export { Container };
