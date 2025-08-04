import { Button, Modal } from '@bds/ui';

import { DELETE_MODAL } from '@widgets/community/constant/modal-delete-content';

interface CommunityModalProps {
  type: 'feed' | 'comment';
  commentId?: string;
  onClose: () => void;
  onConfirmDeleteFeed: () => void;
  onConfirmDeleteComment: (commentId: string) => void;
}

const CommunityModal = ({
  type,
  commentId,
  onClose,
  onConfirmDeleteFeed,
  onConfirmDeleteComment,
}: CommunityModalProps) => {
  const isFeed = type === 'feed';

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
          취소
        </Button>
        <Button
          variant="error"
          onClick={() => {
            if (isFeed) {
              onConfirmDeleteFeed();
            } else if (commentId) {
              onConfirmDeleteComment(commentId);
            }
          }}
        >
          삭제
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CommunityModal;
