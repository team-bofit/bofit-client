import { ReactNode } from 'react';

import { createStore, useStore } from '../../../store/store';
import { randomId } from '../../../utils/random-id';

export interface ModalData {
  id: string;
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
  options: Partial<
    Pick<ModalData, 'id' | 'backdrop' | 'closeOnBackdropClick'>
  > = {},
  store: ModalStore = modalStore,
) {
  const id = options.id || randomId();

  const modalData: ModalData = {
    id,
    content,
    backdrop: options.backdrop ?? true,
    closeOnBackdropClick: options.closeOnBackdropClick ?? true,
  };

  store.setState({ modal: modalData });

  return id;
}

export function hideModal(store: ModalStore = modalStore) {
  store.setState({ modal: null });
}

export const modals = {
  show: showModal,
  hide: hideModal,
} as const;

export const useModal = (store: ModalStore = modalStore) => {
  const state = useStore(store);

  return {
    modal: state.modal,
    isOpen: !!state.modal,
    openModal: (
      content: ReactNode,
      options?: Parameters<typeof showModal>[1],
    ) => showModal(content, options, store),
    closeModal: () => hideModal(store),
  };
};
