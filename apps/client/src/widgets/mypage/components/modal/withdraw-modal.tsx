import { Button, Modal } from '@bds/ui';

interface WithdrawModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const WITHDRAW_MODAL_TEXT = {
  TITLE: '정말 탈퇴하시겠어요?',
  CONTENT:
    '회원 탈퇴 시 계정이 삭제되며,\n회원 정보가 소멸되어 복구가 불가능합니다.',
  CANCEL: '취소',
  WITHDRAW: '탈퇴하기',
};

const WithdrawModal = ({ onConfirm, onCancel }: WithdrawModalProps) => {
  return (
    <Modal>
      <Modal.Title>{WITHDRAW_MODAL_TEXT.TITLE}</Modal.Title>
      <Modal.ContentContainer>
        <Modal.Content text={WITHDRAW_MODAL_TEXT.CONTENT} />
      </Modal.ContentContainer>
      <Modal.Actions>
        <Button variant="gray_fill" onClick={onCancel}>
          취소
        </Button>
        <Button variant="error" onClick={onConfirm}>
          탈퇴하기
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default WithdrawModal;
