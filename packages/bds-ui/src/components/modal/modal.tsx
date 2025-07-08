import { ReactNode } from 'react';

import * as styles from './modal.css';

interface ModalContainerProps {
  children: ReactNode;
}

interface ModalTitleProps {
  title: string;
}

interface ModalContentProps {
  content: string;
}

interface ModalActionProps {
  children: ReactNode;
}

const Container = ({ children }: ModalContainerProps) => {
  return <dialog className={styles.modalContainer}>{children}</dialog>;
};

const Title = ({ title }: ModalTitleProps) => {
  return <p className={styles.modalTitle}>{title}</p>;
};

const Content = ({ content }: ModalContentProps) => {
  return <p className={styles.modalContent}>{content}</p>;
};

const Action = ({ children }: ModalActionProps) => {
  return <div>{children}</div>;
};

const Modal = {
  Container: Container,
  Title: Title,
  Content: Content,
  Action: Action,
};

export default Modal;
