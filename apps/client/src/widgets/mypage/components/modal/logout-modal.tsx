import { Button, Modal } from '@bds/ui';

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LOGOUT_MODAL_TEXT = {
  TITLE: '로그아웃',
  CONTENT: '로그아웃 하시겠어요?',
  CANCEL: '취소',
  LOGOUT: '로그아웃',
};

const LogoutModal = ({ onConfirm, onCancel }: LogoutModalProps) => {
  return (
    <Modal>
      <Modal.Title>{LOGOUT_MODAL_TEXT.TITLE}</Modal.Title>
      <Modal.ContentContainer>
        <Modal.Content text={LOGOUT_MODAL_TEXT.CONTENT} />
      </Modal.ContentContainer>
      <Modal.Actions>
        <Button variant="gray_fill" onClick={onCancel}>
          {LOGOUT_MODAL_TEXT.CANCEL}
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          {LOGOUT_MODAL_TEXT.LOGOUT}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default LogoutModal;
