import type { Meta, StoryObj } from '@storybook/react-native';

import { ThemedText } from '@/components/themed-text';

const meta = {
  component: ThemedText,
  args: {
    children: 'カレンダー',
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'default',
        'title',
        'small',
        'smallBold',
        'subtitle',
        'link',
        'linkPrimary',
        'code',
      ],
    },
  },
} satisfies Meta<typeof ThemedText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Title: Story = {
  args: { type: 'title' },
};

export const Subtitle: Story = {
  args: { type: 'subtitle' },
};

export const Code: Story = {
  args: { type: 'code', children: 'const today = new Date();' },
};
