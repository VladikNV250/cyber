import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import {
  QuantitySelector,
  type QuantitySelectorProps,
} from './QuantitySelector';

const meta = {
  title: 'Shared/UI/QuantitySelector',
  component: QuantitySelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QuantitySelector>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper to manage state in the story
const QuantitySelectorWithState = (
  args: Omit<QuantitySelectorProps, 'onDecrease' | 'onIncrease'>,
) => {
  const [value, setValue] = useState(args.value || 1);
  return (
    <QuantitySelector
      {...args}
      value={value}
      onDecrease={() => setValue(Math.max(args.min || 1, value - 1))}
      onIncrease={() => setValue(value + 1)}
    />
  );
};

export const Default: Story = {
  render: (args) => <QuantitySelectorWithState {...args} />,
  args: {
    value: 1,
    min: 1,
    onDecrease: () => {},
    onIncrease: () => {},
  },
};

export const WithMax: Story = {
  render: (args) => <QuantitySelectorWithState {...args} />,
  args: {
    value: 4,
    min: 1,
    max: 5,
    onDecrease: () => {},
    onIncrease: () => {},
  },
};
