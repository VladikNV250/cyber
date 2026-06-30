import { Container } from '@/shared/ui';
import { ProductCard } from '@/entities/product';

export function DiscountProductsSection() {
  const dummyProducts = [
    {
      title: 'Apple iPhone 14 Pro 128GB Gold',
      price: '$1437',
      isFavorite: false,
    },
    { title: 'AirPods Max Silver', price: '$549', isFavorite: false },
    {
      title: 'Apple Watch Series 9 GPS 41mm Starlight Aluminum',
      price: '$399',
      isFavorite: false,
    },
    {
      title: 'Apple iPhone 14 Pro 128GB Silver',
      price: '$1499',
      isFavorite: false,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <Container className="flex flex-col gap-8">
        <h2 className="text-2xl font-medium text-foreground">
          Discount up to -50%
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dummyProducts.map((p, i) => (
            <ProductCard
              key={i}
              title={p.title}
              price={p.price}
              isFavorite={p.isFavorite}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
