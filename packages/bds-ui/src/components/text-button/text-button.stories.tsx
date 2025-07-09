import type { Meta, StoryObj } from '@storybook/react';

import TextButton from './text-button';

const meta: Meta<typeof TextButton> = {
  title: 'Common/TextButton',
  component: TextButton,
  parameters: {
    layout: 'centered',
    componentSubtitle: '텍스트 버튼 컴포넌트',
    docs: {
      description: {
        component: `
TextButton 컴포넌트는 색상 스타일만 적용된 텍스트 형태의 버튼입니다.

- \`color\`: 텍스트 색상 스타일 ('black' | 'primary')
- \`disabled\`: 버튼 비활성화 여부
- \`children\`: 버튼에 들어갈 콘텐츠
- 기타 HTML 기본 \`button\` 속성 사용 가능

활성/비활성 및 클릭 시 스타일이 바뀌며, 가벼운 액션 버튼에 적합합니다.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '375px',
          border: '1px solid #ccc',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    children: '텍스트 버튼',
    color: 'black',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof TextButton>;

export const Black: Story = {
  args: {
    color: 'black',
    children: '기본 블랙',
  },
};

export const Primary: Story = {
  args: {
    color: 'primary',
    children: '프라이머리 버튼',
  },
};

export const DisabledBlack: Story = {
  name: 'disabled black',
  args: {
    color: 'black',
    disabled: true,
    children: '비활성 블랙',
  },
};

export const DisabledPrimary: Story = {
  name: 'disabled primary',
  args: {
    color: 'primary',
    disabled: true,
    children: '비활성 프라이머리',
  },
};
