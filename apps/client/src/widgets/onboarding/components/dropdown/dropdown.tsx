import { useState } from 'react';
import { Icon } from '@bds/ui/icons';

import * as styles from './dropdown.css';

const OPTIONS = [
  '사무',
  '교육/전문',
  '서비스',
  '운송/배달',
  '생산/기술',
  '예술/프리랜서',
  '학생/구직자',
  '해당없음(기타)',
];

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownWrapper}>
      <div
        className={
          isOpen === false
            ? styles.dropdownContainer
            : styles.dropdownContainerOpen
        }
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className={styles.dropdownPlaceholder}>
          {selected || '직업을 선택해주세요.'}
        </div>
        <Icon
          name="caret_up_md"
          color="gray800"
          width="2.4rem"
          height="2.4rem"
          className={styles.icon}
          rotate={isOpen ? 180 : undefined}
        />
      </div>

      {isOpen && (
        <ul className={styles.dropdownList}>
          {OPTIONS.map((option) => {
            const isSelected = option === selected;

            return (
              <li
                key={option}
                className={
                  isSelected ? styles.dropdownItemSelected : styles.dropdownItem
                }
                data-selected={isSelected}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
