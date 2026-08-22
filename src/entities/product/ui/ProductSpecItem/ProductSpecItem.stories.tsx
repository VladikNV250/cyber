import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ProductSpecItem } from './ProductSpecItem';

const meta: Meta<typeof ProductSpecItem> = {
  title: 'Entities/Product/ProductSpecItem',
  component: ProductSpecItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductSpecItem>;

export const Default: Story = {
  args: {
    specKey: 'Screen Size',
    specValue: '6.7 inches',
  },
};

export const WithLongTextTooltip: Story = {
  args: {
    specKey: 'Processor Model',
    specValue: 'Apple A17 Pro Bionic Chip with 6-core CPU and 6-core GPU',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Hover over the value to see the Radix UI Tooltip reveal the full text when it is truncated with line-clamp-1.',
      },
    },
  },
};
