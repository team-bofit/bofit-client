import { ReactNode } from 'react';

import * as styles from './modal.css';

interface ModalComponentProps {
  children: ReactNode;
}

const Modal = ({ children }: ModalComponentProps) => {
  return <div className={styles.modalContainer}>{children}</div>;
};

const ModalTitle = ({ children }: ModalComponentProps) => {
  return (
    <div className={styles.modalContentContainer}>
      <p className={styles.modalTitle}>{children}</p>
    </div>
  );
};

const ModalContent = ({ children }: ModalComponentProps) => {
  return (
    <div className={styles.modalContentContainer}>
      <p className={styles.modalContent}>{children}</p>
    </div>
  );
};

const ModalActions = ({ children }: ModalComponentProps) => {
  return <div className={styles.modalActionContainer}>{children}</div>;
};

const ModalTerms = ({ children }: ModalComponentProps) => {
  return <div className={styles.modalTermsContainer}>{children}</div>;
};

Modal.Title = ModalTitle;
Modal.Content = ModalContent;
Modal.Actions = ModalActions;
Modal.Terms = ModalTerms;

export default Modal;
