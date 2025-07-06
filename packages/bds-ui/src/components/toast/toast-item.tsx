import { useEffect } from 'react';

import { TOAST_DEAFULT_VALUE } from './constants/toast-deafult';
import useTimeout from './hooks/use-toast';
import { ToastData } from './types/types';

import * as styles from './toast-item.css';

interface ToastItemProps {
  toast: ToastData;
  onClose: (id: string) => void;
}

const ToastItem = ({ toast, onClose }: ToastItemProps) => {
  const duration = toast.duration ?? TOAST_DEAFULT_VALUE.DURATION;
  const autoClose = toast.autoClose ?? TOAST_DEAFULT_VALUE.AUTOCLOSE;

  const { start, clear } = useTimeout(() => {
    if (toast.id) {
      onClose(toast.id);
    }
  }, duration);

  useEffect(() => {
    if (autoClose && duration > 0) {
      start();
    }
    return () => clear();
  }, [autoClose, duration, start, clear]);

  return (
    <div className={styles.toastContainerRecipe({ position: toast.position })}>
      <div className={styles.toastMessage}>
        {toast.icon}
        <p>{toast.message}</p>
      </div>
    </div>
  );
};

export default ToastItem;
