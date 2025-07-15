import { useRef, useState } from 'react';

import { Icon } from '@bds/ui/icons';

import { JobItem } from '@widgets/onboarding/type/user-info.type';

import useClickOutside from '@shared/hooks/use-click-outside';

import OptionItem from './option-item';

import * as styles from './dropdown.css';
interface DropDownProps {
  selected: string | null;
  onSelect: (value: string) => void;
  jobs?: JobItem[];
}

const DEFAULT_PLACEHOLDER = '직업을 선택해주세요.';

const DropDown = ({ selected, onSelect, jobs }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false), isOpen);

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.dropdownWrapper} ref={ref}>
      <div
        className={
          !isOpen ? styles.dropdownContainer : styles.dropdownContainerOpen
        }
        onClick={handleToggleDropdown}
      >
        <div className={styles.dropdownPlaceholder}>
          {selected || DEFAULT_PLACEHOLDER}
        </div>
        <Icon
          name="caret_up_md"
          color="gray800"
          width="2.4rem"
          height="2.4rem"
          className={styles.icon}
          rotate={isOpen ? undefined : 180}
        />
      </div>

      {isOpen && (
        <ul className={styles.dropdownList}>
          {jobs?.map((job) => (
            <OptionItem
              key={job.job}
              job={job.displayName}
              isSelected={job.displayName === selected}
              onSelect={handleOptionClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
