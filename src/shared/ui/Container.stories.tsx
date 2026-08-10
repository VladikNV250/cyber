import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Container } from './Container';

const meta = {
  title: 'Shared/UI/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="bg-gray-100 py-8 w-full">
      <Container className="bg-white border border-gray-300 p-4 rounded text-center">
        This content is constrained by the container&apos;s max-width (1120px)
        and centered on larger screens.
      </Container>
    </div>
  ),
};
