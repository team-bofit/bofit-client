// InfoBox.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import InfoBox from './info-box';

const meta: Meta<typeof InfoBox> = {
  title: 'Common/InfoBox',
  component: InfoBox,
  parameters: {
    layout: 'centered',
    componentSubtitle: '아이콘 + 설명 텍스트를 보여주는 안내 박스',
    docs: {
      description: {
        component: `
InfoBox 컴포넌트는 아이콘과 간단한 설명 문구를 함께 보여줄 때 사용합니다.

- \`size\`: 컴포넌트 크기 ('md' | 'sm')
- \`iconSize\`: 아이콘 크기 (문자열: '1.6rem', '2rem')
- \`description\`: 안내 문구

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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: '1rem',
          background: '#fff',
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    size: 'md',
    iconSize: '24',
    description: '보험 가입 시 유의사항을 확인해주세요.',
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['md', 'sm'],
    },
    iconSize: {
      control: { type: 'text' },
      description: '아이콘 픽셀 크기(문자열). 예: "16", "20", "24"',
    },
    description: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InfoBox>;

export const Default: Story = {};

export const SmallInfo: Story = {
  args: {
    size: 'sm',
    description:
      '일반암(위암, 폐암 등)과 소액암(갑상선암, 전립선암 등)으로 나뉘며, 소액암은 치료비가 저렴하고 완치가 쉽기 때문에 보장금액이 낮게 설정돼요.',
    iconSize: '1.6rem',
  },
};

export const MediumInfo: Story = {
  args: {
    size: 'md',
    description:
      '일반암(위암, 폐암 등)과 소액암(갑상선암, 전립선암 등)으로 나뉘며, 소액암은 치료비가 저렴하고 완치가 쉽기 때문에 보장금액이 낮게 설정돼요.',
    iconSize: '2rem',
  },
};
