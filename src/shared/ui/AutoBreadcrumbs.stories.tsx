import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AutoBreadcrumbs } from './AutoBreadcrumbs';

const meta = {
  title: 'Shared/UI/AutoBreadcrumbs',
  component: AutoBreadcrumbs,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/catalog/smartphones/iphone-15',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AutoBreadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomLabels: Story = {
  args: {
    labels: {
      catalog: 'Store',
      smartphones: 'Mobile Phones',
    },
  },
};
