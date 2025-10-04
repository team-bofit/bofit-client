import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../../icons';
import Input from './input';

type InputProps = React.ComponentProps<typeof Input>;

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '공통 Input 컴포넌트입니다. 배경색(`white`, `whiteBackground`), 에러 상태, 왼쪽 아이콘, clear 버튼 표시 여부를 조절할 수 있습니다.',
      },
    },
  },
  argTypes: {
    bgColor: {
      control: 'radio',
      options: ['white', 'whiteBackground'],
      description: 'Input 배경색',
    },
    errorState: {
      control: 'boolean',
      description: '에러 상태 여부',
    },
    hasClearButton: {
      control: 'boolean',
      description: 'clear 버튼 표시 여부',
    },
    icon: {
      control: false,
      description: '왼쪽 아이콘 (ReactNode)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

const Template = (args: InputProps) => {
  const [value, setValue] = useState('');
  const isOverLimit = value.length > 30;

  return (
    <div style={{ width: '430px' }}>
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        errorState={isOverLimit}
        errorMessage={'공백 없이 입력해주세요'}
        maxLength={31}
      />
    </div>
  );
};

export const WhiteBackground: Story = {
  name: 'WhiteBackground',
  render: (args) => <Template {...args} />,
  args: {
    bgColor: 'background',
    placeholder: '내용을 입력하세요',
  },
};

export const White: Story = {
  name: 'White',
  render: (args) => <Template {...args} />,
  args: {
    bgColor: 'white',
    placeholder: '내용을 입력하세요',
  },
};

export const withClearButton: Story = {
  name: 'With Clear Button',
  render: (args) => <Template {...args} />,
  args: {
    bgColor: 'background',
    placeholder: '검색어를 입력하세요',
    hasClearButton: true,
    icon: <Icon name="search" width="2.4rem" height="2.4rem" color="gray300" />,
  },
};
