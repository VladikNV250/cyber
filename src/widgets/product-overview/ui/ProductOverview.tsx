'use client';

import { ShieldCheck, Store, Truck } from 'lucide-react';
import { useMemo } from 'react';

import {
  type ProductDetails,
  ProductGallery,
  ProductSpecItem,
} from '@/entities/product';
import { formatPrice } from '@/shared/lib';
import { Button } from '@/shared/ui';

import { findActiveVariant } from '../lib/findActiveVariant';
import { useProductVariantState } from '../lib/useProductVariantState';
import { ProductOptions } from './ProductOptions';

interface Props {
  product: ProductDetails;
}

export function ProductOverview({ product }: Props) {
  const { selectedOptions, handleOptionSelect } = useProductVariantState(
    product.availableOptions,
  );

  const activeVariant = useMemo(() => {
    return findActiveVariant(product.variants, selectedOptions);
  }, [product.variants, selectedOptions]);

  const images = activeVariant?.images?.length ? activeVariant.images : [];

  const price = activeVariant
    ? Number(activeVariant.price)
    : Number(product.minPrice);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-28">
      <ProductGallery images={images} productName={product.name} />

      <div className="flex flex-col">
        <h1 className="text-4xl font-bold mb-6">{product.name}</h1>

        <div className="flex items-end gap-4 mb-4 h-9">
          {activeVariant ? (
            <span className="text-3xl font-medium tracking-wide">
              {formatPrice(price)}
            </span>
          ) : (
            <span className="text-xl font-medium text-red-500 flex items-center h-full">
              Selected combination is not available
            </span>
          )}
        </div>

        <ProductOptions
          availableOptions={product.availableOptions}
          selectedOptions={selectedOptions}
          onOptionSelect={handleOptionSelect}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {Object.entries(product.baseSpecs || {})
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
          <Button color="black" className="flex-1" disabled={!activeVariant}>
            {activeVariant ? 'Add to Cart' : 'Unavailable'}
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
