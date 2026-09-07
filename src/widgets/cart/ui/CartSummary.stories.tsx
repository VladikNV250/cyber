import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CartStoreProvider } from '@/entities/cart/model/provider';
import { iphoneProductImg } from '@/shared/assets';

import { CartSummary } from './CartSummary';

const mockItems = {
  v1: {
    variantId: 'v1',
    productId: 'p1',
    quantity: 1,
    snapshot: {
      name: 'Apple iPhone 14 Pro Max',
      price: 1399,
      image: iphoneProductImg.src,
    },
  },
};

const meta = {
  title: 'Widgets/Cart/CartSummary',
  component: CartSummary,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CartSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <CartStoreProvider initialState={{ items: mockItems }} skipHydration>
        <Story />
      </CartStoreProvider>
    ),
  ],
};

export const Empty: Story = {
  decorators: [
    (Story) => (
      <CartStoreProvider initialState={{ items: {} }} skipHydration>
        <Story />
      </CartStoreProvider>
    ),
  ],
};
