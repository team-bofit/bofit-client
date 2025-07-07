import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../../icons/components/icon';
import Floating from './floating';

const meta: Meta<typeof Floating> = {
  title: 'Common/Floating',
  component: Floating,
  parameters: {
    layout: 'centered',
    componentSubtitle: '플로팅 버튼',
    docs: {
      description: {
        component: `
Floating 컴포넌트는 원형의 액션 버튼입니다. 아이콘과 상태에 따라 시각적으로 달라지며, 클릭 이벤트를 처리할 수 있습니다.

**Props 설명:**
- \`icon\`: 버튼 안에 들어갈 아이콘 (ReactNode)
- \`state\`: 'default' | 'inactive' (inactive 상태일 경우 클릭 불가)
- \`onClick\`: 버튼 클릭 시 실행될 함수
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Floating>;

export const Default: Story = {
  args: {
    icon: <Icon name={'edit'} width={'100%'} height={'100%'} />,
    state: 'default',
    onClick: () => alert('Floating 버튼 onClick 예시입니다.'),
  },
};

export const Inactive: Story = {
  name: 'inactive',
  args: {
    icon: <Icon name={'edit'} width={'100%'} height={'100%'} />,
    state: 'inactive',
    onClick: () => alert('해당 onClick은 실행되지 않습니다.'),
  },
};
