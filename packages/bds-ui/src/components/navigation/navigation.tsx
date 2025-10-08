import { type ReactNode } from 'react';

import * as styles from './navigation.css';

interface NavigationProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  searchIcon?: ReactNode;
  title: ReactNode;
  textColor?: 'black' | 'white';
  backgroundColor?: 'transparent' | 'white' | 'primary' | 'gradient_primary';
  isTextButton?: boolean;
  hasZIndex?: boolean;
  isSticky?: boolean;
  onClickLeft?: () => void;
  onClickRight?: () => void;
  onClickSearch?: () => void;
}

const Navigation = ({
  leftIcon,
  rightIcon,
  searchIcon,
  title,
  textColor = 'black',
  backgroundColor = 'transparent',
  isTextButton = false,
  hasZIndex = false,
  isSticky = false,
  onClickLeft,
  onClickRight,
  onClickSearch,
}: NavigationProps) => {
  return (
    <nav
      className={styles.navigationVariants({
        backgroundColor,
        hasZIndex,
        isSticky,
      })}
    >
      <div
        className={styles.navigationLeft}
        onClick={onClickLeft}
        role="button"
      >
        {leftIcon}
      </div>
      <h1 className={styles.titleVariants({ color: textColor })}>{title}</h1>
      <div className={styles.navigationRightContainer}>
        {searchIcon && (
          <div
            className={styles.navigationSearch}
            onClick={onClickSearch}
            role="button"
          >
            {searchIcon}
          </div>
        )}
        <div
          className={styles.navigationRightVariants({ isTextButton })}
          onClick={onClickRight}
          role="button"
        >
          {rightIcon}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
