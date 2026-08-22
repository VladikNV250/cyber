import { ProductSummary } from '../../model/schemas';
import { ProductCard } from '../ProductCard/ProductCard';

interface ProductGridProps {
  products: ProductSummary[];
  columns?: 3 | 4;
  className?: string;
}

export function ProductGrid({
  products,
  columns = 4,
  className,
}: ProductGridProps) {
  const gridClass =
    columns === 3
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4';

  return (
    <div className={`grid ${gridClass} ${className || ''}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          imageUrl={product.imageUrl}
        />
      ))}
    </div>
  );
}
