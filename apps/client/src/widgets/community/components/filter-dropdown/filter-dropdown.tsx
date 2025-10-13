import { Children, ReactNode } from 'react';

import { useToggle } from '@shared/hooks/use-toggle';

import * as styles from './filter-dropdown.css';

interface FilterDropDownProps {
  optionTitle?: string;
  children: ReactNode;
  rightIcon?: ReactNode;
  isIconRotate?: boolean;
  iconBackground?: 'transparent' | 'whiteBackground';
}

const FilterDropDown = ({
  optionTitle,
  children,
  rightIcon,
  isIconRotate,
  iconBackground = 'transparent',
}: FilterDropDownProps) => {
  const [open, toggle] = useToggle(false);

  return (
    <div className={styles.DropDownContainer} onClick={toggle}>
      <div className={styles.DropDownTitle}>
        {optionTitle}
        <div
          className={styles.DropDownIcon({
            background: iconBackground,
            isRotate: isIconRotate && !open,
          })}
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
