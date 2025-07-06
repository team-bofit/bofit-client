import type { Meta, StoryObj } from '@storybook/react';

import Chip from './chip';

const meta: Meta<typeof Chip> = {
  title: 'Common/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Chip 컴포넌트',
    docs: {
      description: {
        component: `
Chip 컴포넌트는 태그 형태의 버튼입니다.

- \`label\`: Chip에 표시되는 내용
- \`color\`: 배경 색상 ('gray' | 'primary')
- \`size\`: 모양 ('rectangular' | 'rounded')
- \`outline\`: 외곽선 여부 (true/false)

\`color\`와 \`size\` 조합으로 다양한 스타일을 연출할 수 있으며, \`outline\`을 true로 주면 외곽선이 표시됩니다.
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
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    label: 'Chip',
    color: 'gray',
    size: 'rectangular',
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    label: 'Chip 기본',
  },
};

export const PrimaryRounded: Story = {
  name: 'Primary & Rounded',
  args: {
    label: 'Primary Rounded',
    color: 'primary',
    size: 'rounded',
  },
};

export const OutlinedGray: Story = {
  name: 'Gray with Outline',
  args: {
    label: 'Gray Outline',
    color: 'gray',
    size: 'rectangular',
    outline: true,
  },
};
