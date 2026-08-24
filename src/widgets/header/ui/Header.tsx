import { Heart, Search, ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { logoBlack } from '@/shared/assets';
import { Button, Container, Input } from '@/shared/ui';

import { categories } from '../config/categories';
import { NavLinks } from './NavLinks';

export function Header() {
  return (
    <header className="sticky top-0 z-100 w-full flex flex-col">
      <div className="w-full bg-background border-b border-border py-4">
        <Container className="flex items-center gap-8">
          <Link href="/" className="shrink-0">
            <Image src={logoBlack} alt="Cyber Logo" className="h-8 w-auto" />
          </Link>

          <div className="hidden flex-1 md:flex max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-6 text-text-muted-icon" />
            <Input
              type="search"
              placeholder="Search"
              className="w-full pl-12 border-transparent bg-input-bg focus-visible:bg-background rounded-xl"
            />
          </div>

          <NavLinks />

          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon">
              <Heart className="size-7" />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <ShoppingCart className="size-7" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="size-7" />
            </Button>
          </div>
        </Container>
      </div>

      <div className="w-full bg-background-header hidden md:block py-3">
        <Container className="flex items-center justify-between divide-x divide-white/20">
          {categories.map(({ name, Icon, href }) => (
            <Link
              key={name}
              href={href}
              className="flex items-center gap-2 text-background opacity-50 hover:opacity-100 transition-opacity text-base font-medium h-6 px-12 first:pl-0 last:pr-0"
            >
              {<Icon className="size-6" />}
              {name}
            </Link>
          ))}
        </Container>
      </div>
    </header>
  );
}
