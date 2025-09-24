import { Children, ReactNode } from 'react';

import { Icon } from '@bds/ui/icons';

import { useToggle } from '@shared/hooks/use-toggle';

import * as styles from './filter-dropdown.css';

interface FilterDropDownProps {
  optionTitle?: string;
  children: ReactNode;
  IconType?: 'arrow' | 'more';
}

const FilterDropDown = ({
  optionTitle,
  children,
  IconType = 'arrow',
}: FilterDropDownProps) => {
  const [open, toggle] = useToggle(false);

  return (
    <div className={styles.DropDownContainer} onClick={toggle}>
      <div className={styles.DropDownTitle}>
        {optionTitle}
        <Icon
          name={IconType === 'arrow' ? 'caret_down_sm' : 'more'}
          rotate={IconType === 'arrow' && !open ? 180 : undefined}
          className={styles.DropDownIcon}
        />
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
