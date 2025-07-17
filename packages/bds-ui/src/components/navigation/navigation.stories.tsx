import type { Meta, StoryObj } from '@storybook/react';

import { Navigation, TextButton } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

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
- **isTextButton**: 우측 아이콘 영역이 텍스트 버튼 형태일 경우 true
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '375px', border: '1px solid #eee' }}>
        <Story />
      </div>
    ),
  ],
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
        type: {
          summary: 'transparent | white | primary | gradient_primary',
        },
        defaultValue: { summary: 'transparent' },
      },
    },
    isTextButton: {
      control: { type: 'boolean' },
      description: '우측 버튼이 텍스트 버튼 형태인 경우 true',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    isTextButton: false,
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
    leftIcon: <Icon name="arrow_left" />,
    rightIcon: <Icon name="home" color="gray800" />,
    title: '뒤로가기',
    backgroundColor: 'white',
    textColor: 'black',
    isTextButton: false,
  },
  parameters: {
    docs: {
      description: {
        story: '좌측에 뒤로가기 아이콘이 포함된 Navigation입니다.',
      },
    },
  },
};

export const ColoredBackground: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Navigation
        leftIcon={<Icon name="arrow_left" />}
        rightIcon={<Icon name="home" color="gray800" />}
        title="Primary 배경"
        backgroundColor="primary"
        textColor="white"
      />
      <Navigation
        leftIcon={<Icon name="arrow_left" />}
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
        leftIcon={<Icon name="arrow_left" color="white" />}
        rightIcon={<Icon name="home" color="white" />}
        title="White 텍스트"
        backgroundColor="transparent"
        textColor="white"
      />
      <Navigation
        leftIcon={<Icon name="arrow_left" color="gray800" />}
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

export const WithTextButtonRightIcon: Story = {
  args: {
    title: '커뮤니티',
    leftIcon: <Icon name="arrow_left" />,
    rightIcon: <TextButton color="primary">text</TextButton>,
    backgroundColor: 'white',
    textColor: 'black',
    isTextButton: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '`TextButton`을 우측에 사용하고 `isTextButton`을 true로 설정한 예시입니다.',
      },
    },
  },
};
