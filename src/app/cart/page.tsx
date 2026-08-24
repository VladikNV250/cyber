import { Container } from '@/shared/ui';
import { CartList, CartSummary } from '@/widgets/cart';

export default function CartPage() {
  return (
    <Container className="py-12 md:py-18 flex flex-col lg:flex-row gap-12 lg:gap-20">
      <div className="flex-1 space-y-10">
        <h1 className="text-3xl font-semibold">Shopping Cart</h1>
        <CartList />
      </div>
      <div className="w-full lg:w-100 xl:w-134">
        <CartSummary />
      </div>
    </Container>
  );
}
