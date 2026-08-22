import type { ProductVariant } from '@/entities/product';

export function findActiveVariant(
  variants: ProductVariant[],
  selectedOptions: Record<string, string | null>, // nuqs returns string | null for state
) {
  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    variants.find((variant) => {
      const attrs = variant.attributes || {};
      return Object.entries(selectedOptions).every(
        ([key, val]) => !val || attrs[key] === val,
      );
    }) || null
  );
}
