import { Children, isValidElement, ReactNode } from 'react';

import * as styles from './modal.css';

interface ModalProps {
  children: ReactNode;
}

interface ModalTitleProps {
  title: string;
}

interface ModalContentProps {
  content: string;
}

interface ModalActionsProps {
  children: ReactNode;
}

interface ModalTermsProps {
  children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  let title: ReactNode = null;
  let content: ReactNode = null;
  let actions: ReactNode = null;
  let terms: ReactNode = null;

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    if (child.type === ModalTitle) {
      title = child;
    } else if (child.type === ModalContent) {
      content = child;
    } else if (child.type === ModalActions) {
      actions = child;
    } else if (child.type === ModalTerms) {
      terms = child;
    }
  });
  return (
    <dialog className={styles.modalContainer}>
      <div className={styles.modalContentContainer}>
        {title}
        {content}
      </div>
      {terms && <div className={styles.modalTermsContainer}>{terms}</div>}
      <div className={styles.modalActionContainer}>{actions}</div>
    </dialog>
  );
};

const ModalTitle = ({ title }: ModalTitleProps) => {
  return <p className={styles.modalTitle}>{title}</p>;
};

const ModalContent = ({ content }: ModalContentProps) => {
  return <p className={styles.modalContent}>{content}</p>;
};

const ModalActions = ({ children }: ModalActionsProps) => {
  return <>{children}</>;
};

const ModalTerms = ({ children }: ModalTermsProps) => {
  return <>{children}</>;
};

Modal.Title = ModalTitle;
Modal.Content = ModalContent;
Modal.Actions = ModalActions;
Modal.Terms = ModalTerms;

export default Modal;
