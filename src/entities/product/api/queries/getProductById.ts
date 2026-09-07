import { prisma } from '@/shared/api';

import { productDetailsSchema } from '../../model/schemas/details';

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      brand: true,
      category: true,
      variants: true,
    },
  });

  if (!product) {
    return null;
  }

  const availableOptions: Record<string, string[]> = {};

  for (const variant of product.variants) {
    if (
      variant.attributes &&
      typeof variant.attributes === 'object' &&
      !Array.isArray(variant.attributes)
    ) {
      for (const [key, value] of Object.entries(variant.attributes)) {
        if (!availableOptions[key]) {
          availableOptions[key] = [];
        }
        const strValue = String(value);
        if (!availableOptions[key].includes(strValue)) {
          availableOptions[key].push(strValue);
        }
      }
    }
  }

  const data = {
    ...product,
    availableOptions,
  };

  return productDetailsSchema.parse(data);
}
