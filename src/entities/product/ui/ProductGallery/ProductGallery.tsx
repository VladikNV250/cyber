'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const mainImage =
    activeImage && images.includes(activeImage) ? activeImage : images[0];

  return (
    <div className="flex gap-4 h-125 self-center">
      <div className="flex flex-col gap-4 overflow-y-auto pr-2 no-scrollbar w-24 shrink-0">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(img)}
            className={`w-full aspect-square relative rounded-md border-2 overflow-hidden transition-colors ${
              activeImage === img || (!activeImage && i === 0)
                ? 'border-primary'
                : 'border-transparent hover:border-gray-200'
            }`}
          >
            <Image
              src={img}
              alt={`${productName} - image ${i + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div className="flex-1 relative bg-gray-50 rounded-lg flex items-center justify-center p-8">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={productName}
            fill
            className="object-contain p-8"
          />
        ) : (
          <div className="text-gray-400">No Image</div>
        )}
      </div>
    </div>
  );
}
