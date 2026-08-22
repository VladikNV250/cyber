import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ProductGallery } from './ProductGallery';

const meta: Meta<typeof ProductGallery> = {
  title: 'Entities/Product/ProductGallery',
  component: ProductGallery,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProductGallery>;

const MOCK_IMAGES = [
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop', // phone 1
  'https://images.unsplash.com/photo-1592899677974-c460ce4614e4?q=80&w=600&auto=format&fit=crop', // phone 2
  'https://images.unsplash.com/photo-1605236453806-6ff3685f218e?q=80&w=600&auto=format&fit=crop', // phone 3
];

export const Default: Story = {
  args: {
    productName: 'iPhone 15 Pro',
    images: MOCK_IMAGES,
  },
};

export const SingleImage: Story = {
  args: {
    productName: 'AirPods Pro',
    images: [MOCK_IMAGES[0]],
  },
};

export const NoImages: Story = {
  args: {
    productName: 'Unknown Product',
    images: [],
  },
};
