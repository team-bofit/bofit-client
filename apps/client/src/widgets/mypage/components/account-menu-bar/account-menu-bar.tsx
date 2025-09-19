import { TextButton } from '@bds/ui';

import * as styles from './account-menu-bar.css';

const ACCOUNT_MENU_BAR_TEXT = {
  WITHDRAW: '회원탈퇴',
  LOGOUT: '로그아웃',
};

const AccountMenuBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftButtonWrapper}>
        <TextButton color="black" size="sm">
          {ACCOUNT_MENU_BAR_TEXT.WITHDRAW}
        </TextButton>
      </div>
      <TextButton color="black" size="sm">
        {ACCOUNT_MENU_BAR_TEXT.LOGOUT}
      </TextButton>
    </div>
  );
};

export default AccountMenuBar;
