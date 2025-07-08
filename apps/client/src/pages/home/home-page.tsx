import { Button, Modal, useModal } from '@bds/ui';

const HomePage = () => {
  const { openModal, closeModal } = useModal();

  const handleOpenModal = () => {
    openModal(
      <Modal>
        <Modal.Title>이 댓글을 삭제할까요?</Modal.Title>
        <Modal.Content>삭제한 댓글은 복원되지 않습니다.</Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal}>취소</Button>
          <Button variant="error" onClick={closeModal}>
            확인
          </Button>
        </Modal.Actions>
      </Modal>,
      {
        closeOnBackdropClick: true,
        backdrop: true,
      },
    );
  };
  return (
    <div style={{ backgroundColor: 'white' }}>
      <Button onClick={handleOpenModal}>모달 열기</Button>
    </div>
  );
};

export default HomePage;
