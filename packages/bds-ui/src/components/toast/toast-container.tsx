import { toasts, useDistributedToasts } from './store/toast-store';
import ToastItem from './toast-item';
import { ToastData } from './types/types';
import { ToastPosition } from './types/types';

import * as styles from './toast-container.css';

type ToastPositionMap = Partial<Record<ToastPosition, ToastData[]>>;

const ToastContainer = () => {
  const { toasts: activeToasts } = useDistributedToasts();

  if (activeToasts.length === 0) {
    return null;
  }

  const toastsByPosition: ToastPositionMap = activeToasts.reduce(
    (acc: ToastPositionMap, toast: ToastData) => {
      const position = toast.position ?? 'bottom-center';
      if (!acc[position]) {
        acc[position] = [];
      }
      acc[position]!.push(toast);
      return acc;
    },
    {},
  );

  return (
    <>
      {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
        <div key={position} className={styles.toastContainer}>
          {positionToasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onClose={toasts.hide} />
          ))}
        </div>
      ))}
    </>
  );
};

export default ToastContainer;
