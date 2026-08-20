import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  id?: string;
  className?: string;
  children: ReactNode;
}

export function ConditionalLink({ id, className, children }: Props) {
  if (id) {
    return (
      <Link href={`/products/${id}`} className={className}>
        {children}
      </Link>
    );
  }
  return <>{children}</>;
}
