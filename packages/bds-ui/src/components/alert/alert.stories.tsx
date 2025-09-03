import type { Meta, StoryObj } from '@storybook/react';

import Alert from './alert';

const meta: Meta<typeof Alert> = {
  title: 'Common/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `\n**Alert** 컴포넌트는 커뮤니티 페이지에서는 주의사항 정보를, 보험 추천 페이지에서는 추가 정보를 사용자에게 알려줄 때 사용합니다.\n\n## Types\n- **info**: 일반 정보 안내.\n- **additional**: 보조/추가 안내. 본문 내 \`highlight\`가 [ 대괄호 ]로 강조됩니다.\n\n## Props 요약\n- **iconName**: 'info' | 'info_warning' 아이콘 중 선택\n- **iconSize**: 아이콘 크기(px 또는 rem 등 단위 포함 문자열)\n- **alertHeader**: 상단 제목 (예: '알려드려요 ', '참고하세요')\n- **alertContents**: 본문 내용\n- **type**: 'info' | 'additional' (info: 알림, additional: 강조)\n- **highlight?**: type이 'additional'일 때만 사용되는 강조 텍스트\n          `,
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['info', 'additional'],
      description: '알림의 성격을 선택합니다.',
      table: {
        type: { summary: 'info | additional' },
      },
    },
    iconName: {
      control: { type: 'select' },
      options: ['info', 'info_warning'],
      description: '사용할 아이콘을 선택합니다.',
      table: {
        type: { summary: "'info' | 'info_warning'" },
      },
    },
    iconSize: {
      control: { type: 'select' },
      options: ['2.4rem', '2rem'],
      description: '아이콘 크기를 지정합니다.',
      table: {
        type: { summary: "'2.4rem' | '2rem'" },
      },
    },
    alertHeader: {
      control: { type: 'text' },
      description: '알림 상단 헤더 문구입니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    alertContents: {
      control: { type: 'text' },
      description: '알림 본문 내용입니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    highlight: {
      control: { type: 'text' },
      description:
        "type이 'additional'일 때만 의미가 있는 강조 텍스트입니다. 자동으로 [대괄호]로 감싸집니다.",
      table: {
        type: { summary: 'string' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Alert>;

// 정보 안내형
export const Info: Story = {
  args: {
    type: 'info',
    iconName: 'info',
    iconSize: '2.4rem',
    alertHeader: '알려드려요',
    alertContents:
      '이곳은 보험 정보를 자유롭게 나누는 공간이에요. \n전문가의 참여는 환영하지만, 영업이나 광고 목적의 활동은 금지돼요. \n서로의 경험을 나누며 신뢰할 수 있는 정보를 함께 만들어가요!',
  },
  parameters: {
    docs: {
      description: {
        story:
          '커뮤니티 페이지에 사용되는 커뮤니티에서 주의해야 할 정보를 제공하는 유형입니다.',
      },
    },
  },
};

// 추가 안내형 (highlight 사용)
export const Additional: Story = {
  args: {
    type: 'additional',
    iconName: 'info_warning',
    iconSize: '2rem',
    alertHeader: '참고하세요',
    alertContents: ' 은 이 보험에 포함되지 않아요.',
    highlight: '부정맥, 심부전',
  },
  parameters: {
    docs: {
      description: {
        story:
          "보조/추가 안내용입니다. `highlight`가 앞에 '[주의]'처럼 강조되어 표시됩니다.",
      },
    },
  },
};
