import { createStore, useStore } from '../../../store/store';
import { randomId } from '../../../utils/random-id';
import { TOAST_DEFAULT_VALUE } from '../constants/toast-deafult';
import { ToastData, ToastPosition, ToastsState } from '../types/types';

export type ToastStore = ReturnType<typeof createToastStore>;

const createToastStore = () =>
  createStore<ToastsState>({
    toasts: [],
    defaultPosition: TOAST_DEFAULT_VALUE.POSITION,
    limit: TOAST_DEFAULT_VALUE.LIMIT,
  });

export const toastsStore = createToastStore();

function getDistributedToasts(
  data: ToastData[],
  defaultPosition: ToastPosition,
  limit: number,
) {
  const queue: ToastData[] = [];
  const toasts: ToastData[] = [];
  const count: Record<string, number> = {};

  data.forEach((item) => {
    const position = item.position || defaultPosition;
    count[position] = count[position] || 0;
    count[position] += 1;

    if (count[position] <= limit) {
      toasts.push(item);
    } else {
      queue.push(item);
    }
  });

  return { toasts, queue };
}

export function updateToastsState(
  store: ToastStore,
  update: (toasts: ToastData[]) => ToastData[],
) {
  const state = store.getState();
  const toasts = update([...state.toasts]);
  const updated = getDistributedToasts(
    toasts,
    state.defaultPosition,
    state.limit,
  );

  store.setState({
    toasts: updated.toasts,
    limit: state.limit,
    defaultPosition: state.defaultPosition,
  });
}

export function showToast(toast: ToastData, store: ToastStore = toastsStore) {
  const id = toast.id || randomId();

  updateToastsState(store, (toasts) => {
    if (toast.id && toasts.some((n) => n.id === toast.id)) {
      return toasts;
    }
    return [...toasts, { ...toast, id }];
  });

  return id;
}

export function hideToast(id: string, store: ToastStore = toastsStore) {
  updateToastsState(store, (toasts) =>
    toasts.filter((toast) => toast.id !== id),
  );
  return id;
}

export function updateToast(toast: ToastData, store: ToastStore = toastsStore) {
  updateToastsState(store, (toasts) =>
    toasts.map((item) => {
      if (item.id === toast.id) {
        return { ...item, ...toast };
      }
      return item;
    }),
  );
  return toast.id;
}

export function cleanToasts(store: ToastStore = toastsStore) {
  updateToastsState(store, () => []);
}

export function cleanToastsQueue(store: ToastStore = toastsStore) {
  updateToastsState(store, (toasts) => toasts.slice(0, store.getState().limit));
}

export const toasts = {
  show: showToast,
  hide: hideToast,
  update: updateToast,
  clean: cleanToasts,
  cleanQueue: cleanToastsQueue,
} as const;

export const useToasts = (store: ToastStore = toastsStore) => useStore(store);

export function useDistributedToasts(store: ToastStore = toastsStore) {
  const state = useToasts(store);
  const { toasts, queue } = getDistributedToasts(
    state.toasts,
    state.defaultPosition,
    state.limit,
  );

  return { toasts, queue, ...state };
}
