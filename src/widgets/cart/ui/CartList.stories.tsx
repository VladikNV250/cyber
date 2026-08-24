import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CartStoreProvider } from '@/entities/cart/model/provider';
import { airpodsImg, iphoneProductImg } from '@/shared/assets';

import { CartList } from './CartList';

const mockItems = [
  {
    variantId: '25139526913984',
    productId: 'p1',
    name: 'Apple iPhone 14 Pro Max 128Gb Deep Purple',
    price: 1399,
    image: iphoneProductImg.src,
    quantity: 1,
    attributes: {},
  },
  {
    variantId: '53459358345',
    productId: 'p2',
    name: 'AirPods Max Silver',
    price: 549,
    image: airpodsImg.src,
    quantity: 1,
    attributes: {},
  },
  {
    variantId: '63632324',
    productId: 'p3',
    name: 'Apple Watch Series 9 GPS 41mm Starlight Aluminium',
    price: 399,
    image: iphoneProductImg.src, // Using iphone as fallback since watch image might not exist
    quantity: 1,
    attributes: {},
  },
];

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
