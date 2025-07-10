import type { Meta, StoryObj } from '@storybook/react';

import Avatar from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Common/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    size: 'md',
    alt: '유저 프로필 이미지',
  },
  parameters: {
    docs: {
      description: {
        component: `
\`Avatar\` 컴포넌트는 유저의 프로필 이미지를 표시합니다. 

- \`src\`: 이미지 URL
- \`alt\`: 이미지 대체 텍스트
- \`fallback\`: 이미지가 없을 경우 대신 보여줄 이니셜 텍스트
- \`size\`: 'sm' | 'md' | 'lg' (크기 옵션)

\`src\`가 없고 \`fallback\`도 없으면 아이콘이 자동 표시됩니다.
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  name: '이미지 포함',
  args: {
    src: 'https://www.news1.kr/_next/image?url=https%3A%2F%2Fi3n.news1.kr%2Fsystem%2Fphotos%2F2024%2F10%2F20%2F6937996%2Fhigh.jpg&w=1920&q=75',
  },
};

export const WithFallbackText: Story = {
  name: 'Fallback 텍스트',
  args: {
    fallback: 'JS',
  },
};

export const WithIconFallback: Story = {
  name: 'Fallback 없음 (아이콘)',
  args: {
    src: '',
    fallback: '',
  },
};

export const WithIconLgFallback: Story = {
  name: 'Fallback 없음 (lg 아이콘)',
  args: {
    src: '',
    size: 'lg',
    fallback: '',
  },
};

export const Small: Story = {
  name: '작은 사이즈 (sm)',
  args: {
    size: 'sm',
    fallback: 'S',
  },
};

export const Medium: Story = {
  name: '중간 사이즈 (md)',
  args: {
    size: 'md',
    fallback: 'MM',
  },
};

export const Large: Story = {
  name: '큰 사이즈 (lg)',
  args: {
    size: 'lg',
    src: 'https://dimg.donga.com/wps/NEWS/IMAGE/2025/03/31/131318432.1.jpg',
  },
};
