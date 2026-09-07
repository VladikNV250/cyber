import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { CartItem } from '@/entities/cart';
import {
  CartStoreProvider,
  useCartStore,
} from '@/entities/cart/model/provider';
import { iphoneProductImg } from '@/shared/assets';

import { CartItemCard } from './CartItemCard';

const mockCartRecord = {
  v1: {
    variantId: 'v1',
    productId: 'p1',
    quantity: 1,
    snapshot: {
      name: 'Apple iPhone 14 Pro Max 128Gb Deep Purple',
      price: 1399,
      image: iphoneProductImg.src,
    },
  },
};

const InteractiveWrapper = ({ item }: { item: CartItem }) => {
  const storeItem = useCartStore((state) => state.items[item.variantId]);

  if (!storeItem) {
    return (
      <div className="p-4 text-gray-500 text-sm">Item removed from cart</div>
    );
  }

  return (
    <CartItemCard
      item={{
        ...item,
        quantity: storeItem.quantity,
      }}
    />
  );
};

const meta = {
  title: 'Widgets/Cart/CartItemCard',
  component: CartItemCard,
  parameters: {
    layout: 'padded',
  },
  render: (args) => <InteractiveWrapper item={args.item} />,
  decorators: [
    (Story) => (
      <CartStoreProvider skipHydration initialState={{ items: mockCartRecord }}>
        <Story />
      </CartStoreProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof CartItemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockItem: CartItem = {
  variantId: 'v1',
  productId: 'p1',
  quantity: 1,
  snapshot: {
    name: 'Apple iPhone 14 Pro Max 128Gb Deep Purple',
    price: 1399,
    image: iphoneProductImg.src,
  },
};

export const Default: Story = {
  args: {
    item: mockItem,
  },
};

export const WithQuantity: Story = {
  args: {
    item: {
      ...mockItem,
      quantity: 3,
    },
  },
};
