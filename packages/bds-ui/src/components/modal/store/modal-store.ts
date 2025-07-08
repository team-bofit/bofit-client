import { ReactNode } from 'react';

import { createStore, useStore } from '../../../store/store';

export interface ModalData {
  content: ReactNode;
  backdrop?: boolean;
  closeOnBackdropClick?: boolean;
}

export interface ModalState {
  modal: ModalData | null;
}

export type ModalStore = ReturnType<typeof createModalStore>;

const createModalStore = () =>
  createStore<ModalState>({
    modal: null,
  });

export const modalStore = createModalStore();

export function showModal(
  content: ReactNode,
  options: Partial<Pick<ModalData, 'backdrop' | 'closeOnBackdropClick'>> = {},
) {
  const modalData: ModalData = {
    content,
    backdrop: options.backdrop ?? true,
    closeOnBackdropClick: options.closeOnBackdropClick ?? true,
  };

  modalStore.setState({ modal: modalData });
}

export function hideModal() {
  modalStore.setState({ modal: null });
}

export const useModal = () => {
  const state = useStore(modalStore);

  return {
    modal: state.modal,
    isOpen: !!state.modal,
    openModal: (
      content: ReactNode,
      options?: Parameters<typeof showModal>[1],
    ) => showModal(content, options),
    closeModal: () => hideModal(),
  };
};
