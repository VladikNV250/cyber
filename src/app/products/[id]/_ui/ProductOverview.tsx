'use client';

import { ShieldCheck, Store, Truck } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import type { Prisma } from '@/generated/prisma/client';
import { Button } from '@/shared/ui';

import { ProductSpecItem } from './ProductSpecItem';

type ProductWithVariants = Prisma.ProductGetPayload<{
  include: {
    brand: true;
    category: true;
    variants: true;
  };
}> & {
  availableOptions: Record<string, string[]>;
};

interface Props {
  product: ProductWithVariants;
}

export function ProductOverview({ product }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // 1. Determine selected options from URL
  const selectedOptions = useMemo(() => {
    const options: Record<string, string> = {};
    Object.keys(product.availableOptions).forEach((key) => {
      const urlValue = searchParams.get(key);
      if (urlValue && product.availableOptions[key].includes(urlValue)) {
        options[key] = urlValue;
      } else {
        // Fallback to first available option
        options[key] = product.availableOptions[key][0];
      }
    });
    return options;
  }, [searchParams, product.availableOptions]);

  // Sync missing URL params if needed (optional, for clean URLs)
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let changed = false;
    Object.entries(selectedOptions).forEach(([key, value]) => {
      if (searchParams.get(key) !== value) {
        params.set(key, value);
        changed = true;
      }
    });
    if (changed) {
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [selectedOptions, searchParams, router]);

  const handleOptionSelect = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // 2. Find the active variant based on selected options
  const activeVariant = useMemo(() => {
    return (
      product.variants.find((variant) => {
        const attrs = variant.attributes as Record<string, string>;
        return Object.entries(selectedOptions).every(
          ([key, val]) => attrs[key] === val,
        );
      }) || product.variants[0]
    ); // fallback
  }, [product.variants, selectedOptions]);

  const images = activeVariant?.images?.length ? activeVariant.images : [];

  // If activeImage is not in the current variant's images, reset it to the first one.
  const mainImage =
    activeImage && images.includes(activeImage) ? activeImage : images[0];

  const uahFormatter = new Intl.NumberFormat('uk-UA', {
    style: 'decimal',
    minimumFractionDigits: 0,
  });

  const price = activeVariant
    ? Number(activeVariant.price)
    : Number(product.minPrice);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-28">
      <div className="flex gap-4 h-125 self-center">
        <div className="flex flex-col gap-4 overflow-y-auto pr-2 no-scrollbar w-24 shrink-0">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(img)}
              className={`w-full aspect-square relative rounded-md border-2 overflow-hidden transition-colors ${
                activeImage === img
                  ? 'border-primary'
                  : 'border-transparent hover:border-gray-200'
              }`}
            >
              <Image
                src={img}
                alt={`${product.name} - image ${i + 1}`}
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
              alt={product.name}
              fill
              className="object-contain p-8"
            />
          ) : (
            <div className="text-gray-400">No Image</div>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <h1 className="text-4xl font-bold mb-6">{product.name}</h1>

        <div className="flex items-end gap-4 mb-4">
          <span className="text-3xl font-medium tracking-wide">
            {uahFormatter.format(price)} ₴
          </span>
        </div>

        <div className="flex flex-col gap-6 mb-6">
          {Object.entries(product.availableOptions).map(([key, values]) => {
            // Very simple heuristic to detect color (since colors are usually represented by hex or named colors)
            // But let's just use buttons for everything for now, or styled circles if it looks like a color name.
            // For simplicity in a general DB without specific UI-hints, we use button toggles.
            return (
              <div key={key} className="flex flex-wrap gap-3">
                {values.map((val) => {
                  const isSelected = selectedOptions[key] === val;
                  return (
                    <button
                      key={val}
                      onClick={() => handleOptionSelect(key, val)}
                      className={`cursor-pointer disabled:cursor-default px-6 py-3 border rounded-md text-sm font-medium transition-colors ${
                        isSelected
                          ? 'border-black text-black cursor-default'
                          : 'border-gray-200 text-gray-500 hover:border-gray-400'
                      }`}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {Object.entries((product.baseSpecs as Record<string, string>) || {})
            .slice(0, 6)
            .map(([key, value]) => (
              <ProductSpecItem key={key} specKey={key} specValue={value} />
            ))}
        </div>

        <div className="mb-8">
          <p className={`text-sm text-gray-500 line-clamp-3`}>
            {product.description}
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          <Button variant="outline" color="black" className="flex-1">
            Add to Wishlist
          </Button>
          <Button color="black" className="flex-1">
            Add to Cart
          </Button>
        </div>

        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-4 rounded-xl">
              <Truck className="size-6 text-[#797979] stroke-2" />
            </div>
            <div className="flex flex-col text-sm font-medium">
              <span className="text-gray-400">Free Delivery</span>
              <span className="text-black">1-2 day</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-4 rounded-xl">
              <Store className="size-6 text-[#797979] stroke-2" />
            </div>
            <div className="flex flex-col text-sm font-medium">
              <span className="text-gray-400">In Stock</span>
              <span className="text-black">Today</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-4 rounded-xl">
              <ShieldCheck className="size-6 text-[#797979] stroke-2" />
            </div>
            <div className="flex flex-col text-sm font-medium">
              <span className="text-gray-400">Guaranteed</span>
              <span className="text-black">1 year</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
