import type { Meta, StoryObj } from '@storybook/react';

import Content from './content';

const meta: Meta<typeof Content> = {
  title: 'Common/Content',
  component: Content,
  parameters: {
    layout: 'centered',
    componentSubtitle: '본문 콘텐츠 컴포넌트',
    docs: {
      description: {
        component: `
Content 컴포넌트는 본문 텍스트를 스타일링하며, 길이에 따라 다른 폰트 스타일을 적용합니다.

- \`text\`: 본문에 들어갈 문자열
- \`length\`: 'sm' | 'md' | 'lg' (폰트 크기를 제어합니다.)

- sm: body2_r_12
- md: body2_r_14
- lg: body2_r_16
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
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Content>;

export const SmallText: Story = {
  name: '작은 본문 (sm)',
  args: {
    text: '작은 본문입니다. font는 body2_r_12입니다.',
    length: 'sm',
  },
};

export const MediumText: Story = {
  name: '중간 본문 (md)',
  args: {
    text: '중간 길이의 본문입니다. font는 body2_r_14입니다.',
    length: 'md',
  },
};

export const LargeText: Story = {
  name: '긴 본문 (lg)',
  args: {
    text: '긴 본문입니다. font는 body2_r_16입니다.',
    length: 'lg',
  },
};
