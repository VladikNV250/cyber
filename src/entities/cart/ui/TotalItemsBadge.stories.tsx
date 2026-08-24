import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ShoppingCart } from 'lucide-react';

import { CartStoreProvider } from '@/entities/cart/model/provider';
import { Button } from '@/shared/ui';

import { TotalItemsBadge } from './TotalItemsBadge';

const meta = {
  title: 'Entities/Cart/TotalItemsBadge',
  component: TotalItemsBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="relative">
        <Button variant="ghost" size="icon">
          <ShoppingCart className="size-7" />
        </Button>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TotalItemsBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockItems = [
  {
    variantId: 'v1',
    productId: 'p1',
    name: 'Mock Item',
    price: 100,
    image: '',
    quantity: 3,
    attributes: {},
  },
];

export const Default: Story = {
  decorators: [
    (Story) => (
      <CartStoreProvider initialState={{ items: mockItems }} skipHydration>
        <Story />
      </CartStoreProvider>
    ),
  ],
};

export const MoreThanNineItems: Story = {
  decorators: [
    (Story) => (
      <CartStoreProvider
        initialState={{
          items: [{ ...mockItems[0], quantity: 12 }],
        }}
        skipHydration
      >
        <Story />
      </CartStoreProvider>
    ),
  ],
};

export const MoreThanNinetyNineItems: Story = {
  decorators: [
    (Story) => (
      <CartStoreProvider
        initialState={{
          items: [{ ...mockItems[0], quantity: 105 }],
        }}
        skipHydration
      >
        <Story />
      </CartStoreProvider>
    ),
  ],
};

export const Empty: Story = {
  decorators: [
    (Story) => (
      <CartStoreProvider initialState={{ items: [] }} skipHydration>
        <Story />
      </CartStoreProvider>
    ),
  ],
};
