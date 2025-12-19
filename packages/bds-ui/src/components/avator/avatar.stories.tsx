import type { Meta, StoryObj } from '@storybook/react';

import Avatar from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Common/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Avatar** 컴포넌트는 유저의 프로필 이미지를 표시합니다.

## Props 요약
- **src**: 이미지 URL
- **alt**: 이미지 대체 텍스트
- **fallback**: 이미지가 없을 경우 대신 보여줄 이니셜 텍스트
- **size**: 'sm' | 'md' | 'lg' (크기 옵션)

\`src\`가 없고 \`fallback\`도 없으면 기본 프로필 아이콘이 표시됩니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    size: 'md',
    alt: '유저 프로필 이미지',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '아바타의 크기를 결정합니다.',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    src: {
      control: { type: 'text' },
      description: '프로필 이미지 URL입니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    alt: {
      control: { type: 'text' },
      description: '이미지 대체 텍스트입니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    fallback: {
      control: { type: 'text' },
      description: '이미지가 없을 때 표시할 이니셜 텍스트입니다.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// 이미지가 있는 아바타
export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=32',
  },
  parameters: {
    docs: {
      description: {
        story: '프로필 이미지가 있는 경우입니다.',
      },
    },
  },
};

// Fallback 텍스트
export const WithFallback: Story = {
  args: {
    fallback: 'JH',
  },
  parameters: {
    docs: {
      description: {
        story: '이미지가 없고 fallback 텍스트(이니셜)만 표시하는 경우입니다.',
      },
    },
  },
};

// 기본 아이콘 (src, fallback 모두 없음)
export const WithIcon: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'src와 fallback 모두 없을 때 기본 프로필 아이콘이 표시됩니다.',
      },
    },
  },
};

// 작은 사이즈
export const Small: Story = {
  args: {
    size: 'sm',
    src: 'https://i.pravatar.cc/150?img=32',
  },
  parameters: {
    docs: {
      description: {
        story: 'sm 사이즈 (3rem) 아바타입니다.',
      },
    },
  },
};

// 중간 사이즈
export const Medium: Story = {
  args: {
    size: 'md',
    src: 'https://i.pravatar.cc/150?img=32',
  },
  parameters: {
    docs: {
      description: {
        story: 'md 사이즈 (3.6rem) 아바타입니다. 기본값입니다.',
      },
    },
  },
};

// 큰 사이즈
export const Large: Story = {
  args: {
    size: 'lg',
    src: 'https://i.pravatar.cc/150?img=32',
  },
  parameters: {
    docs: {
      description: {
        story: 'lg 사이즈 (12.8rem) 아바타입니다.',
      },
    },
  },
};
