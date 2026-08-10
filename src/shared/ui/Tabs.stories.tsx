import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

const meta = {
  title: 'Shared/UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-100">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-gray-500">
          Make changes to your account here.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-gray-500">Change your password here.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const DisabledTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-100">
      <TabsList>
        <TabsTrigger value="tab1">Enabled Tab</TabsTrigger>
        <TabsTrigger value="tab2" disabled>
          Disabled Tab
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm text-gray-500">This tab is active.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm text-gray-500">You won&apos;t see this.</p>
      </TabsContent>
    </Tabs>
  ),
};
