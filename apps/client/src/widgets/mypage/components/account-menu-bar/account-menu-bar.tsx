import { TextButton } from '@bds/ui';

import { useSocialLogout } from '../../hooks/use-social-logout';

import * as styles from './account-menu-bar.css';

const ACCOUNT_MENU_BAR_TEXT = {
  WITHDRAW: '회원탈퇴',
  LOGOUT: '로그아웃',
};

const AccountMenuBar = () => {
  const { kakaoLogout } = useSocialLogout();

  const handleLogout = () => {
    kakaoLogout();
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftButtonWrapper}>
        <TextButton
          color="black"
          size="sm"
          onClick={() => {
            // TODO: 회원탈퇴 기능 구현
          }}
        >
          {ACCOUNT_MENU_BAR_TEXT.WITHDRAW}
        </TextButton>
      </div>
      <TextButton color="black" size="sm" onClick={handleLogout}>
        {ACCOUNT_MENU_BAR_TEXT.LOGOUT}
      </TextButton>
    </div>
  );
};

export default AccountMenuBar;
