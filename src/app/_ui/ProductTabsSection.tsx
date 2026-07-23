import { ProductCard } from '@/entities/product';
import { iphoneProductImg } from '@/shared/assets';
import { Container } from '@/shared/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui';

export function ProductTabsSection() {
  const dummyProducts = [
    {
      title: 'Apple iPhone 14 Pro Max 128GB Deep Purple',
      price: 900,
      isFavorite: false,
      imageUrl: iphoneProductImg,
    },
    {
      title: 'Blackmagic Design Pocket Cinema Camera 6K',
      price: 2535,
      isFavorite: false,
    },
    {
      title: 'Apple Watch Series 9 GPS 41mm Starlight Aluminum',
      price: 399,
      isFavorite: false,
    },
    {
      title: 'AirPods Max Silver',
      price: 549,
      isFavorite: false,
      imageUrl: iphoneProductImg,
    },
    {
      title: 'Samsung Galaxy Watch6 Classic 47mm Black',
      price: 369,
      isFavorite: false,
    },
    {
      title: 'Galaxy Z Fold5 Unlocked | 256GB | Phantom Black',
      price: 1799,
      isFavorite: true,
    },
    {
      title: 'Galaxy Buds2 Pro True Wireless Earbud Headphones',
      price: 229.99,
      isFavorite: false,
    },
    {
      title: 'Apple iPad 9 10.2" 64GB Wi-Fi Silver',
      price: 398,
      isFavorite: false,
    },
  ];

  return (
    <section className="py-14 bg-background">
      <Container>
        <Tabs defaultValue="new-arrival" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="new-arrival" className="px-0">
              New Arrival
            </TabsTrigger>
            <TabsTrigger value="bestseller" className="px-0">
              Bestseller
            </TabsTrigger>
            <TabsTrigger value="featured" className="px-0">
              Featured Products
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new-arrival" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dummyProducts.map((p, i) => (
                <ProductCard
                  key={i}
                  name={p.title}
                  price={p.price}
                  isFavorite={p.isFavorite}
                  imageUrl={p.imageUrl}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="bestseller" className="mt-0">
            <div className="flex h-64 items-center justify-center text-muted-foreground">
              Bestseller Products Empty State
            </div>
          </TabsContent>
          <TabsContent value="featured" className="mt-0">
            <div className="flex h-64 items-center justify-center text-muted-foreground">
              Featured Products Empty State
            </div>
          </TabsContent>
        </Tabs>
      </Container>
    </section>
  );
}
