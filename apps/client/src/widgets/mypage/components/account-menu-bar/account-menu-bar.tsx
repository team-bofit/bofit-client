import { TextButton } from '@bds/ui';

import { useSocialWithdraw } from '@widgets/mypage/hooks/use-social-withdraw';

import { useSocialLogout } from '../../hooks/use-social-logout';

import * as styles from './account-menu-bar.css';

const ACCOUNT_MENU_BAR_TEXT = {
  WITHDRAW: '회원탈퇴',
  LOGOUT: '로그아웃',
};

const AccountMenuBar = () => {
  const { kakaoLogout } = useSocialLogout();
  const { kakaoWithdraw } = useSocialWithdraw();

  const handleLogout = () => {
    kakaoLogout();
  };

  const handleWithdraw = () => {
    kakaoWithdraw();
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftButtonWrapper}>
        <TextButton color="black" size="sm" onClick={handleWithdraw}>
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
