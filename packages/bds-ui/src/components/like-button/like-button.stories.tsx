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
- 이번 likebutton 컴포넌트는 접근성을 고려하며 설계하였습니다.
- width와 height는 디자인에서 딱 정해진 값이 존재하지 않아 컴포넌트 내부에서 타입을 제한하지 않고 외부에서 자유롭게 값을 주입받을 수 있도록 하였습니다.

## 접근성
- \`aria-pressed\`로 현재 토글 상태를 노출합니다.
- \`aria-label\`은 동작(눌렀을 때의 행동)을 설명합니다.  
  - liked=true → "좋아요 취소"  
  - liked=false → "좋아요"

## Props 요약
- **width**: 아이콘 가로 (number | string)
- **height**: 아이콘 세로 (number | string)
- **liked**: 현재 좋아요 상태 (boolean)
- **onToggle?**: 클릭 시 호출되는 콜백 (상태 토글은 상위에서 처리, 맨 밑에 Interactive 부분이 있으니 여기서 테스트하시면 됩니다.)
        `,
      },
    },
  },
  argTypes: {
    liked: {
      control: { type: 'boolean' },
      description: '좋아요 상태를 나타냅니다.',
      table: { type: { summary: 'boolean' } },
    },
    width: {
      control: { type: 'text' },
      description: '아이콘 가로 (px 또는 rem 등 단위 포함 문자열).',
      table: { type: { summary: 'number | string' } },
    },
    height: {
      control: { type: 'text' },
      description: '아이콘 세로 (px 또는 rem 등 단위 포함 문자열).',
      table: { type: { summary: 'number | string' } },
    },
    onToggle: {
      description:
        '버튼 클릭 시 호출됩니다. 상태 변경은 상위에서 처리하면 됩니다.',
      table: { type: { summary: '() => void' } },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LikeButton>;

/**
 * 기본(좋아요 해제) 상태
 */
export const Default: Story = {
  args: {
    liked: false,
    width: 24,
    height: 24,
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 상태입니다. 상위 컴포넌트에서 `onToggle`을 사용하여 조작합니다.',
      },
    },
  },
};

/**
 * 좋아요된 상태
 */
export const Liked: Story = {
  args: {
    liked: true,
    width: 24,
    height: 24,
  },
  parameters: {
    docs: {
      description: {
        story:
          '좋아요가 설정된 상태입니다. 스크린리더에서는 "좋아요 취소"로 안내되고, `aria-pressed`는 눌림 상태를 전달합니다.',
      },
    },
  },
};

/**
 * 스토리 내에서 상태를 제어하는 인터랙티브 예시
 */
export const Interactive: Story = {
  args: {
    liked: false,
    width: 32,
    height: 32,
  },
  render: (args) => {
    const [liked, setLiked] = useState<boolean>(Boolean(args.liked));
    return (
      <LikeButton {...args} liked={liked} onToggle={() => setLiked(!liked)} />
    );
  },
  parameters: {
    docs: {
      description: {
        story: '스토리 내부에서 상태를 테스트 할 수 있도록 만들어 듀었습니다.',
      },
    },
  },
};
