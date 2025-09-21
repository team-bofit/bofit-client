import { Button, Modal } from '@bds/ui';

interface WithdrawModalProps {
  onWithdraw: () => void;
  onCancelWithdraw: () => void;
}

const WithdrawModal = ({
  onWithdraw,
  onCancelWithdraw,
}: WithdrawModalProps) => {
  return (
    <Modal>
      <Modal.Title>정말 탈퇴하시겠어요?</Modal.Title>
      <Modal.ContentContainer>
        <Modal.Content
          text={`회원 탈퇴 시 계정이 삭제되며,\n회원 정보가 소멸되어 복구가 불가능합니다.`}
        />
      </Modal.ContentContainer>
      <Modal.Actions>
        <Button variant="gray_fill" onClick={onCancelWithdraw}>
          취소
        </Button>
        <Button variant="error" onClick={onWithdraw}>
          탈퇴하기
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default WithdrawModal;
