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
- 이번 likebutton 컴포넌트는 접근성을 고려하여 설계하였습니다.
- width와 height는 디자인에서 딱 정해진 값이 존재하지 않아 컴포넌트 내부에서 타입을 제한하지 않고 외부에서 자유롭게 값을 주입받을 수 있도록 하였으나 컨벤션에 따라 string 타입으로 두었습니다.

## 접근성
- \`aria-label\`은 동작(눌렀을 때의 행동)을 설명합니다. 사용자로부터 aria-label을 입력받아서 사용하도록 하였습니다.

## Props 요약
- **width**: 아이콘 가로 (string)
- **height**: 아이콘 세로 (string)
- **isActive**: 현재 좋아요 상태 (boolean)
- **onToggle?**: 클릭 시 호출되는 콜백 (상태 토글은 상위에서 처리, 맨 밑에 Interactive 부분이 있으니 여기서 테스트하시면 됩니다.)
- **ariaLabelWhenActive?**: 활성화(좋아요됨) 상태일 때 스크린리더에 노출될 라벨내용
- **ariaLabelWhenInActive?**: 비활성화(좋아요 안됨) 상태일 때 스크린리더에 노출될 라벨내용
        `,
      },
    },
  },
  argTypes: {
    isActive: {
      control: { type: 'boolean' },
      description: '좋아요 상태를 나타냅니다.',
      table: { type: { summary: 'boolean' } },
    },
    width: {
      control: { type: 'text' },
      description: '아이콘 가로 (px 또는 rem 등 단위 포함 문자열).',
      table: { type: { summary: 'string' } },
    },
    height: {
      control: { type: 'text' },
      description: '아이콘 세로 (px 또는 rem 등 단위 포함 문자열).',
      table: { type: { summary: 'string' } },
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

export const Default: Story = {
  args: {
    isActive: false,
    width: '2.4rem',
    height: '2.4rem',
    ariaLabelWhenActive: '좋아요 취소',
    ariaLabelWhenInActive: '좋아요',
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

export const Liked: Story = {
  args: {
    isActive: true,
    width: '2.4rem',
    height: '2.4rem',
    ariaLabelWhenActive: '좋아요 취소',
    ariaLabelWhenInActive: '좋아요',
  },
  parameters: {
    docs: {
      description: {
        story:
          '좋아요가 설정된 상태입니다. 스크린리더에서는 "좋아요 취소"로 안내됩니다.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    isActive: false,
    width: '3.2rem',
    height: '3.2rem',
    ariaLabelWhenActive: '좋아요 취소',
    ariaLabelWhenInActive: '좋아요',
  },
  render: (args) => {
    const [liked, setLiked] = useState<boolean>(Boolean(args.isActive));
    return (
      <LikeButton
        {...args}
        isActive={liked}
        onToggle={() => setLiked(!liked)}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: '스토리 내부에서 상태를 테스트 할 수 있도록 만들어 두었습니다.',
      },
    },
  },
};
