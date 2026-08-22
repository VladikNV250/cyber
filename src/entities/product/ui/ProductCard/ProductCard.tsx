import { Heart } from 'lucide-react';
import { StaticImageData } from 'next/image';

import { formatPrice } from '@/shared/lib';
import { Button } from '@/shared/ui';

import { ConditionalLink } from './ConditionalLink';
import { ProductCardImage } from './ProductCardImage';
import { ProductCardTitle } from './ProductCardTitle';

export interface ProductCardProps {
  id?: string;
  name: string;
  price: number;
  imageUrl?: string | StaticImageData;
  isFavorite?: boolean;
}

export function ProductCard({
  id,
  name: title,
  price,
  imageUrl,
  isFavorite = false,
}: ProductCardProps) {
  return (
    <div className="group relative flex flex-col items-center justify-between rounded-lg bg-card px-4 py-6  transition-shadow hover:shadow-md h-108">
      <Button
        variant="ghost"
        size="icon"
        className={`absolute right-4 top-4 hover:bg-transparent p-0 h-auto transition-colors z-10 ${isFavorite ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
      >
        <Heart className="size-8" fill={isFavorite ? 'currentColor' : 'none'} />
      </Button>

      <div className="flex-1 flex items-center justify-center w-full mt-4 mb-4 relative min-h-40">
        <ConditionalLink id={id}>
          <ProductCardImage imageUrl={imageUrl} alt={title} />
        </ConditionalLink>
      </div>

      <div className="mt-auto flex flex-col items-center w-full gap-4">
        <ConditionalLink id={id} className="hover:underline">
          <ProductCardTitle title={title} />
        </ConditionalLink>
        <p className="text-2xl font-semibold text-foreground">
          {formatPrice(price)}
        </p>
        <Button className="mt-2" variant="default" size="lg">
          Buy Now
        </Button>
      </div>
    </div>
  );
}
