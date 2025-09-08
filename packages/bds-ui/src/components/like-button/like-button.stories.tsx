import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import LikeButton from './like-button';

const meta: Meta<typeof LikeButton> = {
  title: 'Common/LikeButton',
  component: LikeButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**LikeButton** 컴포넌트는 '좋아요' 토글을 위한 디자인 시스템 컴포넌트입니다.  
상태는 외부에서 관리하도록 설계하였습니다.

## 설계 고려사항
- 접근성을 고려해 설계했습니다.
- 크기는 \`size\` variant('sm' | 'md')로 관리합니다. sm: '1.6rem', md: '2.4rem'

## 접근성
- \`aria-label\`은 동작(눌렀을 때의 행동)을 설명합니다. 사용자로부터 \`ariaLabelWhenActive\` / \`ariaLabelWhenInActive\`를 입력받아 사용합니다.

## Props 요약
- **size**: 아이콘 크기 프리셋 ('sm' | 'md')
- **isActive**: 현재 좋아요 상태 (boolean)
- **onToggle?**: 클릭 시 호출되는 콜백 (상태 토글은 상위에서 처리; 맨 아래 \`Interactive\`에서 테스트)
- **ariaLabelWhenActive?**: 활성화(좋아요됨) 상태일 때 스크린리더 라벨
- **ariaLabelWhenInActive?**: 비활성화(좋아요 안됨) 상태일 때 스크린리더 라벨
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md'],
      description: '아이콘 크기 프리셋',
      table: { type: { summary: "'sm' | 'md'" } },
    },
    isActive: {
      control: { type: 'boolean' },
      description: '좋아요 상태를 나타냅니다.',
      table: { type: { summary: 'boolean' } },
    },
    onToggle: {
      description:
        '버튼 클릭 시 호출됩니다. 상태 변경은 상위에서 처리하면 됩니다.',
      table: { type: { summary: '() => void' } },
    },
    ariaLabelWhenActive: {
      control: { type: 'text' },
      description: '활성화(좋아요됨) 상태에서의 aria-label.',
      table: { type: { summary: 'string' } },
    },
    ariaLabelWhenInActive: {
      control: { type: 'text' },
      description: '비활성(좋아요 안됨) 상태에서의 aria-label.',
      table: { type: { summary: 'string' } },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LikeButton>;

// Storybook 전용 Wrapper
function SizeWrapper({
  size,
  children,
}: {
  size: 'sm' | 'md';
  children: React.ReactNode;
}) {
  const className = `sb-like-size-${size}`;
  const css = `
    .${className} svg {
      width: ${size === 'sm' ? '1.6rem' : '2.4rem'} !important;
      height: ${size === 'sm' ? '1.6rem' : '2.4rem'} !important;
    }
  `;
  return (
    <div className={className}>
      <style>{css}</style>
      {children}
    </div>
  );
}

export const Default: Story = {
  args: {
    size: 'md',
    isActive: false,
    ariaLabelWhenActive: '좋아요 취소',
    ariaLabelWhenInActive: '좋아요',
  },
  render: (args) => (
    <SizeWrapper size={args.size}>
      <LikeButton {...args} />
    </SizeWrapper>
  ),
};

export const Liked: Story = {
  args: {
    size: 'md',
    isActive: true,
    ariaLabelWhenActive: '좋아요 취소',
    ariaLabelWhenInActive: '좋아요',
  },
  render: (args) => (
    <SizeWrapper size={args.size}>
      <LikeButton {...args} />
    </SizeWrapper>
  ),
};

export const Interactive: Story = {
  args: {
    size: 'sm',
    isActive: false,
    ariaLabelWhenActive: '좋아요 취소',
    ariaLabelWhenInActive: '좋아요',
  },
  render: (args) => {
    const [liked, setLiked] = useState<boolean>(Boolean(args.isActive));
    return (
      <SizeWrapper size={args.size}>
        <LikeButton
          {...args}
          isActive={liked}
          onToggle={() => setLiked(!liked)}
        />
      </SizeWrapper>
    );
  },
};
