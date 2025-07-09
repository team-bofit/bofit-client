import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Input from './input';

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    componentSubtitle: '텍스트 입력 인풋 필드',
    docs: {
      description: {
        component: `
Input 컴포넌트는 placeholder와 focus 효과를 포함한 사용자 입력 필드입니다.

- \`value\`: 입력된 문자열 값
- \`onChange\`: 값 변경 핸들러

텍스트가 입력되면 폰트 스타일이 변경되며, 외곽 클릭 시에도 자동 focus됩니다.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '375px',
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
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

export const WithInitialValue: Story = {
  name: '초기값 포함',
  render: () => {
    const [value, setValue] = useState('입력된 텍스트');

    return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};
