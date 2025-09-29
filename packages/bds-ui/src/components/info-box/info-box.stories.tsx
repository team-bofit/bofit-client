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
- \`highlightDescription\`: 강조가 포함된 JSX(있으면 \`description\` 대신 우선 표시)
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
      description: '아이콘 픽셀 크기(문자열). 예: "16", "20"',
    },
    description: {
      control: { type: 'text' },
    },
    highlightDescription: {
      control: false,
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: '—' },
      },
      description:
        '강조(굵게 등)가 포함된 JSX. 제공되면 description 대신 렌더됩니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InfoBox>;

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

export const HighlightInfo: Story = {
  render: (args) => (
    <InfoBox
      {...args}
      highlightDescription={
        <p>
          <strong>갱신형</strong>은 일정 기간마다 보험료가 재산정될 수 있고,{' '}
          <strong>비갱신형</strong>은 가입 시 정해진 보험료가 만기까지 유지돼요.
        </p>
      }
      iconSize="2rem"
      size="md"
    />
  ),
};
