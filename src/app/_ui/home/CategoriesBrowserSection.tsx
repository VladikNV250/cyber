'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui';
import { Container } from '@/shared/ui';
import { CategoryCard } from '@/entities/category/ui';
import {
  Smartphone,
  Watch,
  Camera,
  Headphones,
  Monitor,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export function CategoriesBrowserSection() {
  const categories = [
    {
      title: 'Phones',
      icon: <Smartphone className="size-10" />,
      href: '/catalog/smartphones',
    },
    {
      title: 'Smart Watches',
      icon: <Watch className="size-10" />,
      href: '/catalog/watches',
    },
    {
      title: 'Cameras',
      icon: <Camera className="size-10" />,
      href: '/catalog/cameras',
    },
    {
      title: 'Headphones',
      icon: <Headphones className="size-10" />,
      href: '/catalog/headphones',
    },
    {
      title: 'Computers',
      icon: <Monitor className="size-10" />,
      href: '/catalog/computers',
    },
    {
      title: 'Gaming',
      icon: <Gamepad2 className="size-10" />,
      href: '/catalog/gaming',
    },
    {
      title: 'Computers ',
      icon: <Monitor className="size-10" />,
      href: '/catalog/computers',
    },
    {
      title: 'Phones ',
      icon: <Smartphone className="size-10" />,
      href: '/catalog/smartphones',
    },
    {
      title: 'Gaming ',
      icon: <Gamepad2 className="size-10" />,
      href: '/catalog/gaming',
    },
    {
      title: 'Smart Watches ',
      icon: <Watch className="size-10" />,
      href: '/catalog/watches',
    },
    {
      title: 'Headphones ',
      icon: <Headphones className="size-10" />,
      href: '/catalog/headphones',
    },
    {
      title: 'Cameras ',
      icon: <Camera className="size-10" />,
      href: '/catalog/cameras',
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 6;
  const maxIndex = Math.max(0, categories.length - itemsPerPage);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleCategories = categories.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <section className="py-20 bg-muted">
      <Container>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-medium text-foreground tracking-tight">
            Browse By Category
          </h2>
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              disabled={startIndex === 0}
              className="hover:bg-transparent p-0 h-auto text-foreground hover:opacity-70 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="size-8 stroke-[1.5]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              disabled={startIndex >= maxIndex}
              className="hover:bg-transparent p-0 h-auto text-foreground hover:opacity-70 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="size-8 stroke-[1.5]" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
          {visibleCategories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              icon={category.icon}
              href={category.href}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
