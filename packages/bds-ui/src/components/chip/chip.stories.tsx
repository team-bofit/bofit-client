import type { Meta, StoryObj } from '@storybook/react';

import Chip from './chip';

const meta: Meta<typeof Chip> = {
  title: 'Common/HomeChip',
  component: Chip,
  parameters: {
    layout: 'centered',
    componentSubtitle: 'HomeChip 컴포넌트',
    docs: {
      description: {
        component: `
Chip 컴포넌트는 태그 형태의 버튼입니다.

- \`label\`: Chip에 표시되는 텍스트
- \`fontColor\`: 글자 색상 ('gray' | 'primary')
- \`backgroundColor\`: 배경 색상 ('gray' | 'primary100' | 'primary200')
- \`shape\`: 모양 ('rectangular' | 'rounded')
- \`outline\`: 외곽선 여부 (true/false)

다양한 조합으로 Chip의 스타일을 설정할 수 있습니다.
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
    fontColor: 'gray',
    backgroundColor: 'gray',
    shape: 'rounded',
    outline: false,
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    label: '기본 HomeChip',
  },
};

export const Primary100Rounded: Story = {
  name: 'Primary100 & Rounded',
  args: {
    label: 'Primary100 Rounded',
    fontColor: 'primary',
    backgroundColor: 'primary100',
    shape: 'rounded',
  },
};

export const Primary200Rectangular: Story = {
  name: 'Primary200 & Rectangular',
  args: {
    label: 'Primary200 Rect',
    fontColor: 'primary',
    backgroundColor: 'primary200',
    shape: 'rectangular',
  },
};

export const OutlinedGray: Story = {
  name: 'Gray with Outline',
  args: {
    label: 'Gray Outline',
    fontColor: 'gray',
    backgroundColor: 'gray',
    shape: 'rectangular',
    outline: true,
  },
};
