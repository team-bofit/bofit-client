import { type ReactNode } from 'react';

import * as styles from './navigation.css';

interface NavigationProps {
  leftIcon: ReactNode;
  rightIcon: ReactNode;
  title: ReactNode;
  textColor?: 'white' | 'black';
  backgroundColor?: 'transparent' | 'white' | 'primary' | 'gradient_primary';
}

const Navigation = ({
  leftIcon,
  rightIcon,
  title,
  textColor = 'white',
  backgroundColor = 'transparent',
}: NavigationProps) => {
  return (
    <nav className={styles.navigationVariants({ backgroundColor })}>
      {leftIcon}
      <h1 className={styles.titleVariants({ color: textColor })}>{title}</h1>
      {rightIcon}
    </nav>
  );
};

export default Navigation;
