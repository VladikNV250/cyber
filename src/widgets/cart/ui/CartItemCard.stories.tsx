import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  CartStoreProvider,
  useCartStore,
} from '@/entities/cart/model/provider';
import type { CartItem } from '@/entities/cart/model/schemas';
import { iphoneProductImg } from '@/shared/assets';

import { CartItemCard } from './CartItemCard';

const InteractiveWrapper = ({ item }: { item: CartItem }) => {
  const storeItem = useCartStore((state) =>
    state.items.find((i) => i.variantId === item.variantId),
  );

  if (!storeItem) {
    return (
      <div className="p-4 text-gray-500 text-sm">Item removed from cart</div>
    );
  }

  return <CartItemCard item={storeItem} />;
};

const meta = {
  title: 'Widgets/Cart/CartItemCard',
  component: CartItemCard,
  parameters: {
    layout: 'padded',
  },
  render: (args) => <InteractiveWrapper item={args.item} />,
  decorators: [
    (Story, context) => (
      <CartStoreProvider
        skipHydration
        initialState={{ items: [context.args.item as CartItem] }}
      >
        <Story />
      </CartStoreProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof CartItemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockItem = {
  variantId: 'v1',
  productId: 'p1',
  name: 'Apple iPhone 14 Pro Max 128Gb Deep Purple',
  price: 1399,
  image: iphoneProductImg.src,

  quantity: 1,
  attributes: {},
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
