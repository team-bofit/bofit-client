import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '@bds/ui/icons';

import Chip from './chip';

const meta: Meta<typeof Chip> = {
  title: 'Common/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Chip** 컴포넌트는 태그 형태의 버튼으로, 정보를 표시하거나 선택/삭제 기능을 제공할 때 사용합니다.

## Variants
- **round**: 둥근 모양
- **square**: 사각 모양

## Sizes
- **small**: 작은 크기
- **medium**: 중간 크기 (square 전용)
- **large**: 큰 크기 (round 전용)

## Props 요약
- **label**: Chip에 표시되는 텍스트
- **active**: 클릭 시 활성화 여부
- **variant**: 'round' | 'square' 모양 선택
- **size**: 'small' | 'medium' | 'large' 크기 선택
- **fontColor**: 글자색 ('gray800' | 'error' | 'bofitOrange' | 'primary600')
- **backgroundColor**: 배경색 ('whiteBackground' | 'primary100' | 'primary200')
- **leftIcon**, **rightIcon**: 텍스트 왼쪽/오른쪽에 아이콘 추가
- **onClick**: Chip 클릭 시 호출
- **onDelete**: 오른쪽(또는 왼쪽) 아이콘 클릭 시 삭제 처리
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    fontColor: {
      control: { type: 'radio' },
      options: ['gray800', 'error', 'bofitOrange', 'primary600'],
    },
    backgroundColor: {
      control: { type: 'radio' },
      options: ['whiteBackground', 'primary100', 'primary200'],
    },
    leftIcon: { control: false },
    rightIcon: { control: false },
    onDelete: { action: '삭제' },
    onClick: { action: '클릭' },
    active: { control: 'boolean' },
    variant: { control: false },
    size: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

// --------------------- Round Small ---------------------
export const RoundSmall: Story = {
  args: {
    label: 'Round Small',
    fontColor: 'gray800',
    backgroundColor: 'whiteBackground',
    variant: 'round',
    size: 'small',
    onClick: undefined,
  },
};

// --------------------- Round Large + Left Icon + Active ---------------------
export const RoundLarge: Story = {
  render: (args) => {
    const [active, setActive] = useState(false);
    return (
      <Chip
        {...args}
        leftIcon={<Icon name="chat_conversation" width={18} />}
        active={active}
        onClick={() => setActive(!active)}
      />
    );
  },
  args: {
    label: 'Round Large',
    fontColor: 'gray800',
    backgroundColor: 'whiteBackground',
    variant: 'round',
    size: 'large',
  },
};

// --------------------- Square Small ---------------------
export const SquareSmall: Story = {
  args: {
    label: 'Square Small',
    fontColor: 'gray800',
    backgroundColor: 'whiteBackground',
    variant: 'square',
    size: 'small',
    onClick: undefined,
  },
};

// --------------------- Square Medium + Right Icon + Deletable ---------------------
export const SquareMedium: Story = {
  render: (args) => {
    const handleDelete = () => alert('아이콘을 클릭해 칩을 삭제합니다.');
    return (
      <Chip
        {...args}
        rightIcon={<Icon name="close_sm" width={24} />}
        onDelete={handleDelete}
      />
    );
  },
  args: {
    label: 'Square Medium',
    fontColor: 'gray800',
    backgroundColor: 'whiteBackground',
    variant: 'round',
    size: 'large',
    onClick: undefined,
  },
};
