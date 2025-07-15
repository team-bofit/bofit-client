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
  isSticky?: boolean;
}

const Navigation = ({
  leftIcon,
  rightIcon,
  title,
  textColor = 'black',
  backgroundColor = 'transparent',
  isTextButton = false,
  hasZIndex = false,
  isSticky = false,
}: NavigationProps) => {
  return (
    <nav
      className={styles.navigationVariants({
        backgroundColor,
        hasZIndex,
        isSticky,
      })}
    >
      <div className={styles.navigationLeft}>{leftIcon}</div>
      <h1 className={styles.titleVariants({ color: textColor })}>{title}</h1>
      <div className={styles.navigationRightVariants({ isTextButton })}>
        {rightIcon}
      </div>
    </nav>
  );
};

export default Navigation;
