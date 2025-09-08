import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Slider from './slider';

const meta: Meta<typeof Slider> = {
  title: 'common/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
  },
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Range Slider 컴포넌트',
    docs: {
      description: {
        component: `
      Slider 컴포넌트는 최소값과 최대값 범위 내에서 두 개의 핸들을 통해 값을 선택할 수 있는 UI 컴포넌트입니다.

- \`min\`: 최소값
- \`max\`: 최대값
- \`defaultValue\`: 초기값 (비제어 방식)
- \`value\`, \`onChange\`: 제어 방식
- \`step\`: 증가 단위
- \`disabled\`: 비활성화 여부
- \`aria-label\`: 접근성을 위한 레이블

      Controlled / Uncontrolled 두 방식 모두 지원하며, 반응형 스타일과 접근성(aria-label)도 함께 제공됩니다.

        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '375px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Slider>;

/**
 * Uncontrolled version with defaultValue
 *
 * 이 스토리는 value를 상태로 관리하지 않는 uncontrolled 방식입니다.
 * 사용자가 슬라이더 핸들을 조작할 때마다 내부 상태가 자동으로 업데이트되며,
 * 외부에서 별도로 value나 onChange를 제어하지 않아도 됩니다.
 *
 * props 설명:
 * - min: 슬라이더의 최소값
 * - max: 슬라이더의 최대값
 * - defaultValue: 초기 값 (제어되지 않는 상태에서 사용됨)
 * - step: 슬라이더 값의 증가 단위
 */

export const Uncontrolled: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: [20, 80],
    step: 1,
  },
};

/**
 * Uncontrolled version with defaultValue
 *
 * 이 스토리는 value를 상태로 관리하지 않는 uncontrolled 방식입니다.
 * 사용자가 슬라이더 핸들을 조작할 때마다 내부 상태가 자동으로 업데이트되며,
 * 외부에서 별도로 value나 onChange를 제어하지 않아도 됩니다.
 *
 * props 설명:
 * - min: 슬라이더의 최소값
 * - max: 슬라이더의 최대값
 * - defaultValue: 초기 값 (새로고침 시에도 유지됨)
 * - step: 슬라이더 값의 증가 단위
 * - onChange: 값 변경 시 호출되는 콜백 함수
 * - aria-chip: 접근성을 위한 레이블
 * - value: 현재 슬라이더 값 (제어되는 상태에서 사용됨)
 */

export const Controlled: Story = {
  render: (args) => {
    const [range, setRange] = useState<[number, number]>([30, 70]);

    return (
      <Slider
        {...args}
        value={range}
        onChange={(val) => {
          setRange(val);
          args.onChange?.(val);
        }}
      />
    );
  },
  args: {
    min: 0,
    max: 100,
    step: 5,
  },
};
