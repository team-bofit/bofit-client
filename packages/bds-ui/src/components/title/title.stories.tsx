import type { Meta, StoryObj } from '@storybook/react';

import Title from './title';

const meta: Meta<typeof Title> = {
  title: 'Common/Title',
  component: Title,
  parameters: {
    layout: 'centered',
    componentSubtitle: '제목 컴포넌트',
    docs: {
      description: {
        component: `
Title 컴포넌트는 h2 태그로 렌더링되며, 세 가지 폰트 스타일을 선택할 수 있습니다.

- \`children\`: 제목 텍스트
- \`fontStyle\`: 'bd_sm' | 'bd_md' | 'eb_md'

\`fontStyle\`에 따라 크기·두께가 다르게 적용됩니다.
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
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    children: '제목',
    fontStyle: 'bd_sm',
  },
};

export default meta;
type Story = StoryObj<typeof Title>;

export const Default: Story = {
  name: '세미 볼드 제목',
  args: {
    children: '세미 볼드 제목입니다.',
    fontStyle: 'bd_sm',
  },
};

export const MediumBold: Story = {
  name: '중간 볼드 제목',
  args: {
    children: '중간 볼드 제목입니다',
    fontStyle: 'bd_md',
  },
};

export const MediumExtraBold: Story = {
  name: '중간 엑스트라볼드 제목',
  args: {
    children: '중간 엑스트라볼드 제목입니다',
    fontStyle: 'eb_md',
  },
};
