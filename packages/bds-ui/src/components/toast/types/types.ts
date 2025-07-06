import { ReactNode } from 'react';

export type StoreSubscriber<Value> = (state: Value) => void;

export type ToastPosition = 'top-center' | 'bottom-center';

export type ToastData = {
  id?: string;
  position?: ToastPosition;
  message: ReactNode;
  duration?: number;
  autoClose?: boolean;
  icon?: ReactNode;
};

export type ToastsState = {
  toasts: ToastData[];
  defaultPosition: ToastPosition;
  limit: number;
};
