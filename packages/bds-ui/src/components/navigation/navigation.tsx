import { type ReactNode } from 'react';

import * as styles from './navigation.css';

interface NavigationProps {
  leftIcon?: ReactNode;
  rightIcon: ReactNode;
  title: ReactNode;
  textColor?: 'black' | 'white';
  backgroundColor?: 'transparent' | 'white' | 'primary' | 'gradient_primary';
}

const Navigation = ({
  leftIcon,
  rightIcon,
  title,
  textColor = 'black',
  backgroundColor = 'transparent',
}: NavigationProps) => {
  return (
    <nav
      className={styles.navigationVariants({
        backgroundColor,
        hasLeftIcon: !!leftIcon,
      })}
    >
      <Icon />
      {leftIcon}
      <h1 className={styles.titleVariants({ color: textColor })}>{title}</h1>
      {rightIcon}
    </nav>
  );
};

export default Navigation;
