import { useEffect } from 'react';

import { useModal } from './store/modal-store';

import * as styles from './modal-container.css';

const ModalContainer = () => {
  const { modal, closeModal } = useModal();

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modal]);

  if (!modal) {
    return null;
  }

  const handleBackdropClick = () => {
    if (modal.closeOnBackdropClick) {
      closeModal();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        {modal.content}
      </div>
    </div>
  );
};

export default ModalContainer;
