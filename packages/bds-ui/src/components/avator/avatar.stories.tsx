import type { Meta, StoryObj } from '@storybook/react';

import Avatar from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Common/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    size: 'lg',
    alt: '유저 이미지',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: 'https://www.news1.kr/_next/image?url=https%3A%2F%2Fi3n.news1.kr%2Fsystem%2Fphotos%2F2024%2F10%2F20%2F6937996%2Fhigh.jpg&w=1920&q=75',
  },
};

export const WithFallbackText: Story = {
  args: {
    fallback: 'JS',
  },
};

export const WithNoFallback: Story = {
  args: {
    src: '',
    fallback: '',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    fallback: 'S',
  },
};

export const Medium: Story = {
  args: {
    size: 'sm',
    fallback: 'MM',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    src: 'https://dimg.donga.com/wps/NEWS/IMAGE/2025/03/31/131318432.1.jpg',
  },
};
