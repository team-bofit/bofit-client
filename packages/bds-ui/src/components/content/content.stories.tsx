// Content.stories.tsx
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

- \`children\`: 본문에 들어갈 문자열
- \`length\`: 'short' | 'long' (본문 길이에 따라 폰트 크기/라인을 변경)

\`length\`에 따라 short(14px), long(16px) 폰트를 사용할 수 있습니다.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '375px',
          // border: '1px solid #ccc',
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    children: '여기에 본문 텍스트가 들어갑니다.',
    length: 'short',
  },
};

export default meta;
type Story = StoryObj<typeof Content>;

export const ShortText: Story = {
  name: '짧은 본문',
  args: {
    children: '짧은 본문 예시입니다. font는 body2_r_14입니다.',
    length: 'short',
  },
};

export const LongText: Story = {
  name: '긴 본문',
  args: {
    children:
      '이것은 긴 본문 스타일을 사용하는 예시입니다. font는 body2_r_16입니다.',
    length: 'long',
  },
};
