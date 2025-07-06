import { ReactNode } from 'react';

import * as styles from './floating.css';

interface FloatingProps {
  icon: ReactNode;
  state?: 'default' | 'pressed' | 'inactive';
  onClick?: () => void;
}

function Floating({ icon, state = 'default', onClick }: FloatingProps) {
  const isDisabled = state === 'inactive';

  const handleClick = () => {
    if (isDisabled) {
      return;
    }
    onClick?.();
  };

  return (
    <button
      className={`${styles.baseButton} ${styles.buttonVariants[state]}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      <div className={`${styles.iconWrapper} ${styles.iconVariants[state]}`}>
        {icon}
      </div>
    </button>
  );
}

export default Floating;
