import { Button, Modal } from '@bds/ui';

import { COMMENT_MODAL } from '@widgets/community/constant/modal-content';

type CommunityModalType =
  | 'feed'
  | 'comment'
  | 'commentReply'
  | 'create'
  | 'edit';

interface CommunityModalProps {
  type: CommunityModalType;
  commentId?: number;
  commentReplyId?: number;
  onClose: () => void;
  onDeleteFeed?: () => void;
  onDeleteComment?: (commentId: number) => void;
  onDeleteCommentReply?: (commentId: number, commentReplyId: number) => void;
  onCancelInput?: () => void;
}

const MODAL_CONTENT: Record<
  CommunityModalType,
  (typeof COMMENT_MODAL)[keyof typeof COMMENT_MODAL]
> = {
  feed: COMMENT_MODAL.FEED,
  comment: COMMENT_MODAL.COMMENT,
  commentReply: COMMENT_MODAL.COMMENT_REPLY,
  create: COMMENT_MODAL.CREATE,
  edit: COMMENT_MODAL.EDIT,
};
const CommunityModal = ({
  type,
  commentId,
  commentReplyId,
  onClose,
  onDeleteFeed,
  onDeleteComment,
  onDeleteCommentReply,
  onCancelInput,
}: CommunityModalProps) => {
  const handleModalAction = () => {
    switch (type) {
      case 'feed':
        onDeleteFeed?.();
        break;
      case 'comment':
        if (typeof commentId === 'number') {
          onDeleteComment?.(commentId);
        }
        break;
      case 'commentReply':
        if (
          typeof commentId === 'number' &&
          typeof commentReplyId === 'number'
        ) {
          onDeleteCommentReply?.(commentId, commentReplyId);
        }
        break;
      case 'create':
      case 'edit':
        onCancelInput?.();
        break;
    }
    onClose();
  };

  const { TITLE, CONTENT, CONFIRM, CANCEL } = MODAL_CONTENT[type];

  const isInputCancel = type === 'create' || type === 'edit';

  return (
    <Modal>
      <Modal.Title>{TITLE}</Modal.Title>
      <Modal.ContentContainer>
        <Modal.Content text={CONTENT} />
      </Modal.ContentContainer>
      <Modal.Actions>
        <Button onClick={onClose} variant="gray_fill">
          {isInputCancel ? CANCEL : '취소'}
        </Button>
        <Button variant="error" onClick={handleModalAction}>
          {isInputCancel ? CONFIRM : '삭제'}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CommunityModal;
