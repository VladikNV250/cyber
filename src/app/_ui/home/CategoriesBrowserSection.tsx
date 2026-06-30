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
    { title: 'Phones', icon: <Smartphone className="size-10" /> },
    { title: 'Smart Watches', icon: <Watch className="size-10" /> },
    { title: 'Cameras', icon: <Camera className="size-10" /> },
    { title: 'Headphones', icon: <Headphones className="size-10" /> },
    { title: 'Computers', icon: <Monitor className="size-10" /> },
    { title: 'Gaming', icon: <Gamepad2 className="size-10" /> },
  ];

  return (
    <section className="py-20 bg-[#FAFAFA]">
      <Container>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-medium text-foreground tracking-tight">
            Browse By Category
          </h2>
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-transparent p-0 h-auto text-black hover:opacity-70 transition-opacity"
            >
              <ChevronLeft className="size-8 stroke-[1.5]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-transparent p-0 h-auto text-black hover:opacity-70 transition-opacity"
            >
              <ChevronRight className="size-8 stroke-[1.5]" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              icon={category.icon}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
