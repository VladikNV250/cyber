import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CartStoreProvider } from '@/entities/cart/model/provider';
import { iphoneProductImg } from '@/shared/assets';

import { CartSummary } from './CartSummary';

const mockItems = [
  {
    variantId: 'v1',
    productId: 'p1',
    name: 'Apple iPhone 14 Pro Max',
    price: 1399,
    image: iphoneProductImg.src,
    quantity: 1,
    attributes: {},
  },
];

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
      <CartStoreProvider initialState={{ items: mockItems }}>
        <Story />
      </CartStoreProvider>
    ),
  ],
};

export const Empty: Story = {
  decorators: [
    (Story) => (
      <CartStoreProvider initialState={{ items: [] }}>
        <Story />
      </CartStoreProvider>
    ),
  ],
};
