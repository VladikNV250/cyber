import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input } from './Input';

const meta = {
  title: 'Shared/UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const File: Story = {
  args: {
    type: 'file',
  },
};
