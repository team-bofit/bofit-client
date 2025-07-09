import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Button from './button';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          Button 컴포넌트 입니다.
          
          ## Variants (변형)
          - **primary**: 기본적인 프라이머리 버튼
          - **error**: 삭제, 취소 등 위험한 액션에 사용되는 빨간색 버튼
          - **border**: 테두리만 있는 버튼
          
          ## Sizes (크기)
          - **small**: 4rem 높이, 폰트 스타일 title_sb_18
          - **medium**: 5rem 높이, 폰트 스타일 head2_b_18
          - **large**: 5.6rem 높이, 폰트 스타일 head2_b_18 
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'error', 'white_fill', 'border'],
      description: '버튼의 시각적 스타일을 결정합니다.',
      table: {
        type: { summary: 'primary | error | white_fill | border' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '버튼의 크기를 결정합니다.',
      table: {
        type: { summary: 'small | medium | large' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '버튼의 비활성화 상태를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: { type: 'text' },
      description: '버튼 내부에 표시될 텍스트나 요소입니다.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

// 기본 버튼
export const Default: Story = {
  args: {
    children: '버튼',
    variant: 'primary',
    size: 'md',
  },
};

// Primary 변형
export const Primary: Story = {
  args: {
    children: 'Primary 버튼',
    variant: 'primary',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story:
          '주요 액션에 사용되는 기본 버튼입니다. 파란색 배경에 흰색 텍스트를 사용합니다.',
      },
    },
  },
};

// Error 변형
export const Error: Story = {
  args: {
    children: 'Error 버튼',
    variant: 'error',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story:
          '삭제, 취소 등 위험한 액션에 사용되는 버튼입니다. 빨간색 배경에 흰색 텍스트를 사용합니다.',
      },
    },
  },
};

export const whiteFill: Story = {
  args: {
    children: 'whiteFill 버튼',
    variant: 'white_fill',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'border 가 있는 흰색 배경을 가진 버튼입니다.',
      },
    },
  },
};

// Border 변형
export const Border: Story = {
  args: {
    children: 'Border 버튼',
    variant: 'border',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story:
          '보조 액션이나 취소에 사용되는 버튼입니다. 투명 배경에 테두리만 있는 스타일입니다.',
      },
    },
  },
};

// 크기
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button variant="primary" size="sm">
        Small
      </Button>
      <Button variant="primary" size="md">
        Medium
      </Button>
      <Button variant="primary" size="lg">
        Large
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '버튼의 세 가지 크기 옵션을 비교할 수 있습니다. Small은 4rem, Medium은 5rem, Large는 5.6rem 높이를 가집니다.',
      },
    },
  },
};

// Disabled 상태
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button variant="primary" size="md" disabled>
        Disabled Primary
      </Button>
      <Button variant="error" size="md" disabled>
        Disabled Error
      </Button>
      <Button variant="border" size="md" disabled>
        Disabled Border
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'disabled 상태의 버튼들입니다. 클릭이 불가능하며 시각적으로도 비활성화된 상태를 나타냅니다.',
      },
    },
  },
};
