import type { Meta, StoryObj } from '@storybook/react';

import Modal from './modal';

const meta: Meta<typeof Modal.Container> = {
  title: 'Common/Modal',
  component: Modal.Container,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### Modal 컴포넌트

- **Container**: 모달의 최상위 Wrapper (\`<dialog>\` 태그)
- **Title**: 모달 제목 표시
- **Content**: 본문 내용 표시
- **Action**: 버튼 영역

## Example 사용법

~~~tsx
<Modal.Container>
  <Modal.Title title="타이틀" />
  <Modal.Content content="본문 내용" />
  <Modal.Action>
    <button>확인</button>
    <button>취소</button>
  </Modal.Action>
</Modal.Container>
~~~
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Modal.Container>;

export const Default: Story = {
  render: () => (
    <Modal.Container>
      <Modal.Title title="이 글을 삭제할까요?" />
      <Modal.Content content="삭제한 글/댓글은 복원되지 않습니다." />
      <Modal.Action>
        <h1>하이</h1>
      </Modal.Action>
    </Modal.Container>
  ),
  parameters: {
    docs: {
      description: {
        story: '기본적인 Modal 예시입니다.',
      },
    },
  },
};

export const LongContent: Story = {
  render: () => (
    <Modal.Container>
      <Modal.Title title="서비스 고지사항" />
      <Modal.Content
        content="본 서비스는 사용자가 입력한 정보를 
바탕으로 보험 상품을 참고용으로 
추천하는 도구입니다. 제공되는 정보는 
공식적인 금융 또는 보험 자문이 아니며, 
보핏은 이를 통/해 중개 수수료 등 경제적 
이익을 얻지 않습니다. 따라서 계약 체결 
전에는 반드시 해당 보험사 또는 공인 
설계사의 설명을 충분히 확인해주시기 
바랍니다. 최종 가입 여부 및 선택에 
대한 책임은 사용자에게 있습니다."
      />
      <Modal.Action>
        <button>닫기</button>
      </Modal.Action>
    </Modal.Container>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '내용이 긴 모달 예시입니다. Content에 줄바꿈이 포함된 경우를 확인하세요.',
      },
    },
  },
};
