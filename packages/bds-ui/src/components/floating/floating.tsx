import { ReactNode } from 'react';

import * as styles from './floating.css';

interface FloatingProps {
  icon: ReactNode;
  state?: 'default' | 'inactive';
  onClick?: () => void;
}

const Floating = ({ icon, state = 'default', onClick }: FloatingProps) => {
  const isDisabled = state === 'inactive';

  const handleClick = () => {
    if (!isDisabled) {
      onClick?.();
    }
  };

  return (
    <button
      className={styles.button({ state })}
      onClick={handleClick}
      disabled={isDisabled}
    >
      <div className={styles.iconWrapper({ state })}>{icon}</div>
    </button>
  );
};

export default Floating;
