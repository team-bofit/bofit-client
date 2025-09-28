import { Button, Modal } from '@bds/ui';

import { DELETE_MODAL } from '@widgets/community/constant/modal-delete-content';

interface CommunityModalProps {
  type: 'feed' | 'comment' | 'commentReply';
  commentId?: number;
  onClose: () => void;
  onConfirmDeleteFeed: () => void;
  onConfirmDeleteComment: (commentId: number) => void;
  onConfirmDeleteCommentReply: (commentId: number) => void;
}

const MODAL_DELETE_CONTENT = {
  feed: DELETE_MODAL.FEED,
  comment: DELETE_MODAL.COMMENT,
  commentReply: DELETE_MODAL.COMMENT_REPLY,
} as const;

const BUTTON_STATUS = {
  CLOSE: '취소',
  DELETE: '삭제',
};

const CommunityModal = ({
  type,
  commentId,
  onClose,
  onConfirmDeleteFeed,
  onConfirmDeleteComment,
  onConfirmDeleteCommentReply,
}: CommunityModalProps) => {
  const handleModalAction = () => {
    switch (type) {
      case 'feed':
        onConfirmDeleteFeed();
        break;
      case 'comment':
        if (typeof commentId === 'number') {
          onConfirmDeleteComment(commentId);
        }
        break;
      case 'commentReply':
        if (typeof commentId === 'number') {
          onConfirmDeleteCommentReply(commentId);
        }
        break;
    }
  };

  const modalType = MODAL_DELETE_CONTENT[type];

  return (
    <Modal>
      <Modal.Title>{modalType.title}</Modal.Title>
      <Modal.ContentContainer>
        <Modal.Content text={modalType.content} />
      </Modal.ContentContainer>
      <Modal.Actions>
        <Button onClick={onClose} variant="gray_fill">
          {BUTTON_STATUS.CLOSE}
        </Button>
        <Button variant="error" onClick={handleModalAction}>
          {BUTTON_STATUS.DELETE}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CommunityModal;
