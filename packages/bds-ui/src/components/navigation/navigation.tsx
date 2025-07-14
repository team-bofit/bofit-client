import { type ReactNode } from 'react';

import * as styles from './navigation.css';

interface NavigationProps {
  leftIcon?: ReactNode;
  rightIcon: ReactNode;
  title: ReactNode;
  textColor?: 'black' | 'white';
  backgroundColor?: 'transparent' | 'white' | 'primary' | 'gradient_primary';
  isTextButton?: boolean;
  hasZIndex?: boolean;
}

const Navigation = ({
  leftIcon,
  rightIcon,
  title,
  textColor = 'black',
  backgroundColor = 'transparent',
  isTextButton = false,
  hasZIndex = false,
}: NavigationProps) => {
  return (
    <nav className={styles.navigationVariants({ backgroundColor, hasZIndex })}>
      <div className={styles.navigationLeft}>{leftIcon}</div>
      <h1 className={styles.titleVariants({ color: textColor })}>{title}</h1>
      <div className={styles.navigationRightVariants({ isTextButton })}>
        {rightIcon}
      </div>
    </nav>
  );
};

export default Navigation;
