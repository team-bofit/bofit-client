import { ReactNode } from 'react';

import * as styles from './modal.css';

interface ModalComponentProps {
  children: ReactNode;
}

interface ModalContentProps {
  text: string;
  displayBlock?: boolean;
}

interface ModalTermsProps {
  onClick: () => void;
  children: ReactNode;
}

const Modal = ({ children }: ModalComponentProps) => {
  return <div className={styles.modalContainer}>{children}</div>;
};

const ModalTitle = ({ children }: ModalComponentProps) => {
  return (
    <div className={styles.modalTitleContainer}>
      <p className={styles.modalTitle}>{children}</p>
    </div>
  );
};

const ModalContentContainer = ({ children }: ModalComponentProps) => {
  return <div className={styles.modalContentContainer}>{children}</div>;
};

const ModalContent = ({ text, displayBlock = true }: ModalContentProps) => {
  return <span className={styles.modalContent({ displayBlock })}>{text}</span>;
};

const ModalHighlightContent = ({ text }: ModalContentProps) => {
  return <span className={styles.modalHighlightContent}>{text}</span>;
};

const ModalActions = ({ children }: ModalComponentProps) => {
  return <div className={styles.modalActionContainer}>{children}</div>;
};

const ModalTerms = ({ onClick, children }: ModalTermsProps) => {
  return (
    <div className={styles.modalTermsContainer} onClick={onClick}>
      {children}
    </div>
  );
};

Modal.Title = ModalTitle;
Modal.ContentContainer = ModalContentContainer;
Modal.Content = ModalContent;
Modal.HighlightContent = ModalHighlightContent;
Modal.Actions = ModalActions;
Modal.Terms = ModalTerms;

export default Modal;
