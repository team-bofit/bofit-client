import { Button, Modal } from '@bds/ui';

import { DELETE_MODAL } from '@widgets/community/constant/modal-delete-content';

interface CommunityModalProps {
  type: 'feed' | 'comment';
  commentId?: string;
  onClose: () => void;
  onConfirmDeleteFeed: () => void;
  onConfirmDeleteComment: (commentId: string) => void;
}

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
}: CommunityModalProps) => {
  const isFeed = type === 'feed';

  const handleModalAction = () => {
    if (isFeed) {
      onConfirmDeleteFeed();
    } else if (commentId) {
      onConfirmDeleteComment(commentId);
    }
  };

  return (
    <Modal>
      <Modal.Title>
        {isFeed ? DELETE_MODAL.FEED.title : DELETE_MODAL.COMMENT.title}
      </Modal.Title>
      <Modal.ContentContainer>
        <Modal.Content
          text={
            isFeed ? DELETE_MODAL.FEED.content : DELETE_MODAL.COMMENT.content
          }
        />
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
