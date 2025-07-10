// Input.stories.tsx
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Input from './input';

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '기본 Input 컴포넌트. 배경색과 에러 상태를 조절할 수 있습니다.',
      },
    },
  },
  argTypes: {
    bgColor: {
      control: 'radio',
      options: ['gray', 'white'],
    },
    errorState: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

const Template = (args: any) => {
  const [value, setValue] = useState('');
  const isOverLimit = value.length > 30;

  return (
    <Input
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      errorState={isOverLimit}
      maxLength={31}
    />
  );
};

export const GrayBackground: Story = {
  name: '배경 회색',
  render: (args) => <Template {...args} />,
  args: {
    bgColor: 'gray',
    errorState: false,
  },
};

export const WhiteBackground: Story = {
  name: '배경 흰색',
  render: (args) => <Template {...args} />,
  args: {
    bgColor: 'white',
    errorState: false,
  },
};
