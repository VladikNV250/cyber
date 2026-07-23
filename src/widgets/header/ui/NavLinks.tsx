'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib';
import { navLinks } from '../config/links';

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex flex-1 justify-between items-center text-base font-medium">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.label}
            href={link.href}
            className={cn('transition-opacity', {
              'text-foreground opacity-100': isActive,
              'text-foreground opacity-30 hover:opacity-100': !isActive,
            })}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
