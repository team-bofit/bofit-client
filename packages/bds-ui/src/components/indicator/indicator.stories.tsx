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
Indicator 컴포넌트는 현재 페이지 위치를 시각적으로 나타내는 UI 요소입니다.

- \`current\`: 현재 선택된 페이지 (1부터 시작)
- \`total\`: 전체 페이지 수

\`current\`가 1 미만이거나 \`total\`을 넘으면 자동으로 보정됩니다.
\`total\`이 0 이하일 경우 최소 1개가 강제 표시됩니다.
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

export const CurrentExceedsTotal: Story = {
  name: 'current > total',
  args: {
    current: 10,
    total: 5,
  },
};

export const NegativeCurrent: Story = {
  name: 'current < 1',
  args: {
    current: -3,
    total: 5,
  },
};

export const ZeroTotal: Story = {
  name: 'total = 0 (최소 1개 보장)',
  args: {
    current: 1,
    total: 0,
  },
};
