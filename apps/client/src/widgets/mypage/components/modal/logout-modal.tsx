import { Button, Modal } from '@bds/ui';

interface LogoutModalProps {
  onLogout: () => void;
  onCancelLogout: () => void;
}

const LogoutModal = ({ onLogout, onCancelLogout }: LogoutModalProps) => {
  return (
    <Modal>
      <Modal.Title>로그아웃</Modal.Title>
      <Modal.ContentContainer>
        <Modal.Content text="로그아웃 하시겠어요?" />
      </Modal.ContentContainer>
      <Modal.Actions>
        <Button variant="gray_fill" onClick={onCancelLogout}>
          취소
        </Button>
        <Button variant="primary" onClick={onLogout}>
          로그아웃
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default LogoutModal;
