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
    <div className={styles.modalTitleContainer}>
      <dl className={styles.modalTitle}>{children}</dl>
    </div>
  );
};

const ModalContent = ({ children }: ModalComponentProps) => {
  return (
    <div className={styles.modalContentContainer}>
      <dd className={styles.modalContent}>{children}</dd>
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
