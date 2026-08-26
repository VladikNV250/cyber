import { Container } from '@/shared/ui';
import { CartList, CartSummary } from '@/widgets/cart';

export default function CartPage() {
  return (
    <Container className="min-h-164 py-12 md:py-18 flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
      <div className="flex-1 space-y-10 w-full min-w-0">
        <h1 className="text-3xl font-semibold">Shopping Cart</h1>
        <CartList />
      </div>
      <div className="w-full lg:w-95 xl:w-105 shrink-0 sticky top-40">
        <CartSummary />
      </div>
    </Container>
  );
}
