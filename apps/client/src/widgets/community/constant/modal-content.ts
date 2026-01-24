interface ModalContent {
  TITLE: string;
  CONTENT: string;
  CANCEL?: string;
  CONFIRM?: string;
}

export const COMMENT_MODAL: Record<
  'FEED' | 'COMMENT' | 'COMMENT_REPLY' | 'CREATE' | 'EDIT',
  ModalContent
> = {
  FEED: {
    TITLE: '이 글을 삭제할까요?',
    CONTENT: '삭제한 글은 복원되지 않습니다.',
  },
  COMMENT: {
    TITLE: '이 댓글을 삭제할까요?',
    CONTENT: '삭제한 댓글은 복원되지 않습니다.',
  },
  COMMENT_REPLY: {
    TITLE: '이 대댓글을 삭제할까요?',
    CONTENT: '삭제한 대댓글은 복원되지 않습니다.',
  },
  CREATE: {
    TITLE: '작성 내용을 삭제할까요?',
    CONTENT: '내용이 저장되지 않습니다.',
    CANCEL: '취소',
    CONFIRM: '삭제',
  },
  EDIT: {
    TITLE: '수정 내용을 삭제할까요?',
    CONTENT: '내용이 저장되지 않습니다.',
    CANCEL: '취소',
    CONFIRM: '삭제',
  },
};
