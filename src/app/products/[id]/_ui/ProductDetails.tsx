'use client';

import type { Prisma } from '@/generated/prisma/client';
import { Container } from '@/shared/ui';

interface Props {
  product: Prisma.ProductGetPayload<Prisma.ProductDefaultArgs>;
}

export function ProductDetails({ product }: Props) {
  const specs = Object.entries(
    (product.baseSpecs as Record<string, string>) || {},
  );

  return (
    <div className="bg-gray-50 py-20">
      <Container>
        <div className="space-y-8 bg-white rounded-lg px-10 py-12">
          <h2 className="text-2xl font-medium">Details</h2>
          <p className="text-[#9D9D9D] text-sm leading-relaxed text-justify">
            {product.description}
          </p>

          <div className="flex flex-col gap-0 max-w-full">
            {specs.map(([key, value], index) => (
              <div
                key={key}
                className={`flex justify-between items-center text-black text-base pb-2 pt-6 ${index !== 0 ? 'border-t border-gray-200' : ''}`}
              >
                <span className="capitalize w-1/3">{key}</span>
                <span className="text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
