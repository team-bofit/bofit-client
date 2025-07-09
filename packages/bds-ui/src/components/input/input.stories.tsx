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
Input 컴포넌트는 placeholder와 focus 효과, 텍스트 입력 상태 스타일이 적용된 입력 필드입니다.

- \`value\`: 현재 입력된 값 (문자열)
- \`onChange\`: 입력값 변경 시 호출되는 이벤트 핸들러
- \`bgColor\`: 배경색 스타일 ('gray' | 'white')

텍스트가 입력되면 폰트 스타일이 변경되며, 클릭 시 자동으로 focus됩니다.
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
type Story = StoryObj<typeof Input>;

export const GrayBackground: Story = {
  name: '회색 배경',
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        bgColor="gray"
      />
    );
  },
};

export const WhiteBackground: Story = {
  name: '흰색 배경',
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        bgColor="white"
      />
    );
  },
};

export const WithInitialValue: Story = {
  name: '초기값 포함',
  render: () => {
    const [value, setValue] = useState('입력된 텍스트');

    return (
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        bgColor="gray"
      />
    );
  },
};
