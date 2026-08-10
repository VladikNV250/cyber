import type { Meta, StoryObj } from '@storybook/react';

import IphoneImage from '@/shared/assets/iphone-product.png';

import { ProductCard } from './ProductCard';

const meta = {
  title: 'Entities/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Apple iPhone 14 Pro Max 128GB Deep Purple',
    price: 45000,
    imageUrl: IphoneImage,
  },
};

export const Favorite: Story = {
  args: {
    name: 'Apple iPhone 14 Pro Max 128GB Deep Purple',
    price: 45000,
    imageUrl: IphoneImage,
    isFavorite: true,
  },
};

export const MissingImageFallback: Story = {
  args: {
    name: 'Sony PlayStation 5 Digital Edition',
    price: 18500,
  },
};

export const LongTextHandling: Story = {
  args: {
    name: 'Asus ROG Strix G16 G614JI-N3143W Eclipse Gray / 16" IPS WUXGA 165Hz / Intel Core i7-13650HX / RAM 16GB / SSD 1TB / nVidia GeForce RTX 4070 8GB',
    price: 72999,
    imageUrl: IphoneImage,
  },
};
