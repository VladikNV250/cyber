'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui';
import { Container } from '@/shared/ui';
import { CategoryCard } from '@/entities/category';
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
      href: '/catalog/284f2d54-cc31-45c9-b87c-ef6c237158cd/245631bd-f50a-4a5b-b407-30bf071a6388',
    },
    {
      title: 'Smart Watches',
      icon: <Watch className="size-10" />,
      href: '/catalog/15451908-d754-465d-a29b-c65efc56190a',
    },
    {
      title: 'Cameras',
      icon: <Camera className="size-10" />,
      href: '/catalog/c1353c06-0659-4495-b9c8-32acf7fdb29c',
    },
    {
      title: 'Headphones',
      icon: <Headphones className="size-10" />,
      href: '/catalog/f950dbec-8c71-4200-b4c4-86742f9b8dc0',
    },
    {
      title: 'Computers',
      icon: <Monitor className="size-10" />,
      href: '/catalog/27d18678-ab56-4dd5-a136-d807509c36e9',
    },
    {
      title: 'Gaming',
      icon: <Gamepad2 className="size-10" />,
      href: '/catalog/035ac999-05cb-4dc5-a307-29fa023c4832',
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
          {categories.length > 6 && (
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
          )}
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
