import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ProductOptions } from './ProductOptions';

const meta: Meta<typeof ProductOptions> = {
  title: 'Widgets/ProductOverview/ProductOptions',
  component: ProductOptions,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onOptionSelect: { action: 'onOptionSelect' },
  },
};

export default meta;
type Story = StoryObj<typeof ProductOptions>;

export const Default: Story = {
  args: {
    availableOptions: {
      Color: ['Black', 'White', 'Titanium'],
      Storage: ['128GB', '256GB', '512GB', '1TB'],
    },
    selectedOptions: {
      Color: 'Titanium',
      Storage: '256GB',
    },
  },
};

export const MissingSelectedOption: Story = {
  args: {
    availableOptions: {
      Size: ['S', 'M', 'L', 'XL'],
    },
    selectedOptions: {
      Size: null,
    },
  },
};
