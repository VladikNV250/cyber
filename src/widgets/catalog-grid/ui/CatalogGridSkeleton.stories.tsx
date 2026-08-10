import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CatalogGridSkeleton } from './CatalogGridSkeleton';

const meta = {
  title: 'Widgets/CatalogGridSkeleton',
  component: CatalogGridSkeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CatalogGridSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-300 mx-auto bg-gray-50 p-8">
      <CatalogGridSkeleton />
    </div>
  ),
};
