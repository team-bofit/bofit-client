import { useEffect } from 'react';

import { useModal } from './store/modal-store';

import * as styles from './modal-container.css';

const ModalContainer = () => {
  const { modal, closeModal } = useModal();

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
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
      {modal.content}
    </div>
  );
};

export default ModalContainer;
