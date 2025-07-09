import { Icon } from '@bds/ui/icons';

import * as styles from './dropdown.css';

const DropDown = () => {
  return (
    <ul className={styles.dropdownContainer}>
      <li className={styles.dropdownPlaceHolder}>직업을 선택해주세요.</li>
      <Icon name="caret_down_md" color="gray800" />
    </ul>
  );
};

export default DropDown;
