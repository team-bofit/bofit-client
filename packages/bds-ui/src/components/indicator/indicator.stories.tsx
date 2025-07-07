import type { Meta, StoryObj } from '@storybook/react';

import Indicator from './indicator';

const meta: Meta<typeof Indicator> = {
  title: 'Common/Indicator',
  component: Indicator,
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Indicator 컴포넌트',
    docs: {
      description: {
        component: `
Indicator 컴포넌트는 현재 페이지 위치를 시각적으로 나타내는 페이지 인디케이터입니다.

- \`current\`: 현재 선택된 페이지 번호 (1부터 시작)
- \`total\`: 전체 페이지 수

현재 페이지는 \`page_selected\` 아이콘으로, 나머지는 \`page_unselected\` 아이콘으로 표시됩니다.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '375px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    current: 1,
    total: 5,
  },
};

export default meta;
type Story = StoryObj<typeof Indicator>;

export const Default: Story = {
  args: {
    current: 1,
    total: 5,
  },
};

export const MiddlePage: Story = {
  name: '중간 페이지',
  args: {
    current: 3,
    total: 5,
  },
};

export const LastPage: Story = {
  name: '마지막 페이지',
  args: {
    current: 5,
    total: 5,
  },
};

export const SinglePage: Story = {
  name: '페이지 1개',
  args: {
    current: 1,
    total: 1,
  },
};
