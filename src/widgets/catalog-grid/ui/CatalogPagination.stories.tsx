import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CatalogPagination } from './CatalogPagination';

const meta = {
  title: 'Widgets/CatalogPagination',
  component: CatalogPagination,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CatalogPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock URL builder for stories
const mockBuildUrl = (page: number) => `?page=${page}`;

export const FewPages: Story = {
  args: {
    page: 2,
    totalPages: 3,
    buildPageUrl: mockBuildUrl,
  },
};

export const StartOfManyPages: Story = {
  args: {
    page: 1,
    totalPages: 10,
    buildPageUrl: mockBuildUrl,
  },
};

export const MiddleOfManyPages: Story = {
  args: {
    page: 5,
    totalPages: 10,
    buildPageUrl: mockBuildUrl,
  },
};

export const EndOfManyPages: Story = {
  args: {
    page: 10,
    totalPages: 10,
    buildPageUrl: mockBuildUrl,
  },
};

export const SinglePage: Story = {
  args: {
    page: 1,
    totalPages: 1,
    buildPageUrl: mockBuildUrl,
  },
};
