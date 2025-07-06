import type { Meta, StoryObj } from '@storybook/react';

import Tab from './tab';

const meta: Meta<typeof Tab> = {
  title: 'Common/Tab',
  component: Tab.Container,
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Compound Pattern 기반의 탭 컴포넌트',
    docs: {
      description: {
        component: `
\`Tab\` 컴포넌트는 Compound Pattern 기반의 커스텀 탭 UI입니다.

### 구조

- \`TabProvider\`: 탭 상태를 관리하는 컨텍스트
- \`Tab\`: 전체 탭 영역을 감싸는 최상위 컴포넌트
- \`Tab.List\`: 탭 목록 래퍼
- \`Tab.Item\`: 각 탭 항목 (클릭 시 해당 탭 활성화)
- \`Tab.Panel\`: 선택된 탭에 따라 렌더링되는 패널 콘텐츠

### Props

- \`Tab.Item\`: \`value: string\` – 해당 탭의 식별자
- \`Tab.Panel\`: \`tab: string\` – 렌더링 조건을 위한 식별자 (Item과 매칭됨)

\`TabProvider\`의 \`initialValue\`로 초기 선택 탭을 지정할 수 있습니다.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '375px',
          border: '1px solid #ddd',
          padding: '1rem',
          margin: '2rem auto',
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  name: '기본 탭',
  render: () => {
    const TABS = [
      { id: 1, value: '큰 병' },
      { id: 2, value: '수술' },
      { id: 3, value: '입원' },
      { id: 4, value: '장해' },
      { id: 5, value: '사망' },
    ] as const;

    return (
      <>
        <Tab.Container initialValue={TABS[0].value}>
          <Tab.List>
            {TABS.map(({ id, value }) => (
              <Tab.Item key={id} value={value} />
            ))}
          </Tab.List>
          {TABS.map(({ id, value }) => (
            <Tab.Panel tab={value} key={id}>
              <div
                style={{
                  padding: '1.5rem',
                  border: '1px solid #eee',
                  marginTop: '1rem',
                  borderRadius: '0.5rem',
                  backgroundColor: '#fafafa',
                  textAlign: 'center',
                }}
              >
                {value} 입니다.
              </div>
            </Tab.Panel>
          ))}
        </Tab.Container>
      </>
    );
  },
};
