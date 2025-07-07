import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../../icons';
import Navigation from './navigation';

const meta: Meta<typeof Navigation> = {
  title: 'Common/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
          상단 Navigation 컴포넌트입니다.

          ## Props
          - **leftIcon**: 좌측 아이콘 요소
          - **rightIcon**: 우측 아이콘 요소 (필수)
          - **title**: 타이틀 텍스트
          - **textColor**: 타이틀 색상 (black | white)
          - **backgroundColor**: 배경색 (transparent | white | primary | gradient_primary)
        `,
      },
    },
  },
  argTypes: {
    leftIcon: {
      description: '좌측에 들어갈 아이콘 컴포넌트',
      control: false,
    },
    rightIcon: {
      description: '우측에 들어갈 아이콘 컴포넌트',
      control: false,
    },
    title: {
      description: '네비게이션 중앙에 표시될 제목',
      control: { type: 'text' },
    },
    textColor: {
      control: { type: 'select' },
      options: ['black', 'white'],
      description: '제목 텍스트 색상',
      table: {
        type: { summary: 'black | white' },
        defaultValue: { summary: 'black' },
      },
    },
    backgroundColor: {
      control: { type: 'select' },
      options: ['transparent', 'white', 'primary', 'gradient_primary'],
      description: '배경 색상',
      table: {
        type: { summary: 'transparent | white | primary | gradient_primary' },
        defaultValue: { summary: 'transparent' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  args: {
    title: '홈',
    rightIcon: <Icon name="home" color="gray800" />,
    backgroundColor: 'transparent',
    textColor: 'black',
  },
  parameters: {
    docs: {
      description: {
        story: '좌측 아이콘 없이 기본 Navigation을 보여줍니다.',
      },
    },
  },
};

export const WithLeftIcon: Story = {
  args: {
    leftIcon: <Icon name="caret_left_lg" color="gray800" />,
    rightIcon: <Icon name="home" color="gray800" />,
    title: '뒤로가기',
    backgroundColor: 'white',
    textColor: 'black',
  },
  parameters: {
    docs: {
      description: {
        story: '좌측에 아이콘(예: 뒤로가기 버튼)이 포함된 Navigation입니다.',
      },
    },
  },
};

export const ColoredBackground: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Navigation
        leftIcon={<Icon name="caret_left_lg" color="gray800" />}
        rightIcon={<Icon name="home" color="gray800" />}
        title="Primary 배경"
        backgroundColor="primary"
        textColor="white"
      />
      <Navigation
        leftIcon={<Icon name="caret_left_lg" color="gray800" />}
        rightIcon={<Icon name="home" color="gray800" />}
        title="Gradient 배경"
        backgroundColor="gradient_primary"
        textColor="white"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '배경색이 primary, gradient_primary인 Navigation 예시입니다.',
      },
    },
  },
};

export const TextColors: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        background: '#333',
        padding: '2rem',
      }}
    >
      <Navigation
        leftIcon={<Icon name="caret_left_lg" color="white" />}
        rightIcon={<Icon name="home" color="white" />}
        title="White 텍스트"
        backgroundColor="transparent"
        textColor="white"
      />
      <Navigation
        leftIcon={<Icon name="caret_left_lg" color="gray800" />}
        rightIcon={<Icon name="home" color="gray800" />}
        title="Black 텍스트"
        backgroundColor="white"
        textColor="black"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '텍스트 색상을 black, white로 다르게 설정한 예시입니다.',
      },
    },
  },
};
