// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import React from 'react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Click me',
  },
};

export const Glowing: Story = {
  args: {
    variant: 'glowing',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

// Add this new story to make the test pass
export const Animated: Story = {
  // Use a custom render function to apply animation classes
  render: () => (
    <Button
      label="Animated"
      className="animate-pulse" // A simple Tailwind CSS animation class
    />
  ),
};