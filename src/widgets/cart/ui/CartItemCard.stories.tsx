import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CartStoreProvider } from '@/entities/cart/model/provider';
import { iphoneProductImg } from '@/shared/assets';

import { CartItemCard } from './CartItemCard';

const meta = {
  title: 'Widgets/Cart/CartItemCard',
  component: CartItemCard,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <CartStoreProvider>
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
