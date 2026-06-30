import { Search, Heart, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import logoBlack from '@/shared/assets/logo-black.png';
import { categories } from '../config';
import { Button, Container, Input } from '@/shared/ui';
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-6 text-[#989898]" />
            <Input
              type="search"
              placeholder="Search"
              className="w-full pl-12 border-none rounded-xl"
            />
          </div>

          <NavLinks />

          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon">
              <Heart className="size-7" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="size-7" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="size-7" />
            </Button>
          </div>
        </Container>
      </div>

      <div className="w-full bg-[#2E2E2E] hidden md:block py-3">
        <Container className="flex items-center justify-between divide-x divide-[#ffffff33]">
          {categories.map((category) => (
            <Link
              key={category.name}
              href="#"
              className="flex items-center gap-2 text-background opacity-50 hover:opacity-100 transition-opacity text-base font-medium h-6 px-12 first:pl-0 last:pr-0"
            >
              {category.icon}
              {category.name}
            </Link>
          ))}
        </Container>
      </div>
    </header>
  );
}
