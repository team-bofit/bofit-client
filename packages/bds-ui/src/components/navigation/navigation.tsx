import { type ReactNode } from 'react';

import * as styles from './navigation.css';

interface NavigationProps {
  leftIcon: ReactNode;
  rightIcon: ReactNode;
  title: ReactNode;
  backgroundColor?: 'transparent' | 'white' | 'primary' | 'gradient_primary';
}

const Navigation = ({
  leftIcon,
  rightIcon,
  title,
  backgroundColor = 'transparent',
}: NavigationProps) => {
  return (
    <nav className={styles.navigationVariants({ backgroundColor })}>
      {leftIcon}
      <div className={styles.title}>{title}</div>
      {rightIcon}
    </nav>
  );
};

export default Navigation;
