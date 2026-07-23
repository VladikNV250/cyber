import { Heart, Image as ImageIcon } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';

import { Button } from '@/shared/ui';

export interface ProductCardProps {
  name: string;
  price: number;
  imageUrl?: StaticImageData;
  isFavorite?: boolean;
}

export function ProductCard({
  name: title,
  price,
  imageUrl,
  isFavorite = false,
}: ProductCardProps) {
  const uahFormatter = new Intl.NumberFormat('uk-UA', {
    style: 'decimal',
    minimumFractionDigits: 0,
  });

  return (
    <div className="group relative flex flex-col items-center justify-between rounded-lg bg-card px-4 py-6  transition-shadow hover:shadow-md h-108">
      <Button
        variant="ghost"
        size="icon"
        className={`absolute right-4 top-4 hover:bg-transparent p-0 h-auto transition-colors ${isFavorite ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
      >
        <Heart className="size-8" fill={isFavorite ? 'currentColor' : 'none'} />
      </Button>

      <div className="flex-1 flex items-center justify-center w-full mt-4 mb-4 relative min-h-40">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={160}
            height={160}
            className="object-contain size-40"
          />
        ) : (
          <div className="h-40 w-40 bg-muted/50 rounded-md flex items-center justify-center text-muted-foreground">
            <ImageIcon className="w-12 h-12 opacity-20" />
          </div>
        )}
      </div>

      <div className="mt-auto flex flex-col items-center w-full gap-4">
        <h3 className="text-base font-medium text-center line-clamp-2 min-h-12 text-foreground">
          {title}
        </h3>
        <p className="text-2xl font-semibold text-foreground">
          {uahFormatter.format(price)} ₴
        </p>
        <Button className="mt-2" variant="default" size="lg">
          Buy Now
        </Button>
      </div>
    </div>
  );
}
