'use client';

import { StaticImageData } from 'next/image';

import { Button } from '@/shared/ui';

import { useBuyNow } from '../model/useBuyNow';

export interface BuyNowButtonProps {
  productId: string;
  name: string;
  price: number;
  imageUrl?: string | StaticImageData;
  className?: string;
}

export function BuyNowButton({
  productId,
  name,
  price,
  imageUrl,
  className,
}: BuyNowButtonProps) {
  const { handleBuyNow } = useBuyNow({ productId, name, price, imageUrl });

  return (
    <Button
      className={className}
      variant="default"
      size="lg"
      onClick={handleBuyNow}
    >
      Buy Now
    </Button>
  );
}
