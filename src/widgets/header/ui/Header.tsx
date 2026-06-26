import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Smartphone,
  Monitor,
  Watch,
  Camera,
  Headphones,
  Gamepad2,
} from 'lucide-react';
import { Input } from '@/shared/ui';
import { Container } from '@/shared/ui';
import Link from 'next/link';
import Image from 'next/image';
import logoBlack from '@/shared/assets/logo-black.png';

export function Header() {
  const categories = [
    { name: 'Phones', icon: <Smartphone className="h-5 w-5" /> },
    { name: 'Computers', icon: <Monitor className="h-5 w-5" /> },
    { name: 'Smart Watches', icon: <Watch className="h-5 w-5" /> },
    { name: 'Cameras', icon: <Camera className="h-5 w-5" /> },
    { name: 'Headphones', icon: <Headphones className="h-5 w-5" /> },
    { name: 'Gaming', icon: <Gamepad2 className="h-5 w-5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col">
      <div className="w-full bg-background border-b border-border">
        <Container>
          <div className="flex h-20 items-center justify-between gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image src={logoBlack} alt="Cyber Logo" className="h-6 w-auto" />
            </Link>

            <div className="hidden flex-1 md:flex max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search"
                className="w-full pl-9 bg-card border-none rounded-xl"
              />
            </div>

            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
              <Link
                href="/"
                className="transition-colors hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact Us
              </Link>
              <Link
                href="/blog"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Blog
              </Link>
            </nav>

            <div className="flex items-center gap-6">
              <button className="text-foreground hover:text-muted-foreground transition-colors">
                <Heart className="h-6 w-6" />
              </button>
              <button className="text-foreground hover:text-muted-foreground transition-colors">
                <ShoppingCart className="h-6 w-6" />
              </button>
              <button className="text-foreground hover:text-muted-foreground transition-colors">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </Container>
      </div>

      <div className="w-full bg-[#2E2E2E] hidden md:block">
        <Container>
          <div className="flex items-center justify-between h-14 divide-x divide-gray-600 w-full">
            {categories.map((category) => (
              <Link
                key={category.name}
                href="#"
                className="flex-1 flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium h-6"
              >
                {category.icon}
                {category.name}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </header>
  );
}
