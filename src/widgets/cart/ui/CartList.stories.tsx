import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CartStoreProvider } from '@/entities/cart/model/provider';
import { airpodsImg, iphoneProductImg } from '@/shared/assets';

import { CartList } from './CartList';

const mockItems = {
  '25139526913984': {
    variantId: '25139526913984',
    productId: 'p1',
    quantity: 1,
    snapshot: {
      name: 'Apple iPhone 14 Pro Max 128Gb Deep Purple',
      price: 1399,
      image: iphoneProductImg.src,
    },
  },
  '53459358345': {
    variantId: '53459358345',
    productId: 'p2',
    quantity: 1,
    snapshot: {
      name: 'AirPods Max Silver',
      price: 549,
      image: airpodsImg.src,
    },
  },
  '63632324': {
    variantId: '63632324',
    productId: 'p3',
    quantity: 1,
    snapshot: {
      name: 'Apple Watch Series 9 GPS 41mm Starlight Aluminium',
      price: 399,
      image: iphoneProductImg.src,
    },
  },
};

const meta = {
  title: 'Widgets/Cart/CartList',
  component: CartList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CartList>;

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
