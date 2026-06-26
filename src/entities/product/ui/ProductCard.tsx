import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Button } from '@/shared/ui';

export interface ProductCardProps {
  title: string;
  price: string;
  imageUrl?: string;
  isFavorite?: boolean;
}

export function ProductCard({
  title,
  price,
  imageUrl,
  isFavorite = false,
}: ProductCardProps) {
  return (
    <div className="group relative flex flex-col items-center justify-between rounded-xl bg-card p-6 transition-shadow hover:shadow-md h-[432px]">
      <Button
        variant="ghost"
        size="icon"
        className={`absolute right-4 top-4 hover:bg-transparent p-0 h-auto transition-colors ${isFavorite ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
      >
        <Heart
          className="h-6 w-6"
          fill={isFavorite ? 'currentColor' : 'none'}
        />
      </Button>

      <div className="flex-1 flex items-center justify-center w-full mt-4 mb-4 relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        ) : (
          <div className="w-full h-[160px] bg-muted rounded-md flex items-center justify-center text-muted-foreground text-sm">
            Image Mockup
          </div>
        )}
      </div>

      <div className="mt-auto flex flex-col items-center w-full gap-4">
        <h3 className="text-base font-medium text-center line-clamp-2 min-h-[48px]">
          {title}
        </h3>
        <p className="text-xl font-bold">{price}</p>
        <Button className="w-full mt-2" variant="default">
          Buy Now
        </Button>
      </div>
    </div>
  );
}
