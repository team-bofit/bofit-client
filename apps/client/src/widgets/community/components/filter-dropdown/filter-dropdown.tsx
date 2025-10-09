import { Children, ReactNode } from 'react';

import { useToggle } from '@shared/hooks/use-toggle';

import * as styles from './filter-dropdown.css';

interface FilterDropDownProps {
  optionTitle?: string;
  children: ReactNode;
  rightIcon?: ReactNode;
  isIconRotate?: boolean;
  iconBackground?: 'white' | 'whiteBackground';
}

const FilterDropDown = ({
  optionTitle,
  children,
  rightIcon,
  isIconRotate,
  iconBackground = 'white',
}: FilterDropDownProps) => {
  const [open, toggle] = useToggle(false);

  return (
    <div className={styles.DropDownContainer} onClick={toggle}>
      <div className={styles.DropDownTitle}>
        {optionTitle}
        <div
          className={`${styles.DropDownIcon} ${styles.isRotate({ isRotate: isIconRotate && !open })} ${iconBackground === 'whiteBackground' ? styles.iconWhiteBackground : styles.iconWhite}`}
        >
          {rightIcon}
        </div>
      </div>
      {open && (
        <div className={styles.DropDownContent}>
          {Children.map(children, (child, idx) => (
            <div key={idx}>{child}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropDown;
