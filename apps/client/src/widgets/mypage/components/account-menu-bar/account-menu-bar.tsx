import { TextButton, useModal } from '@bds/ui';

import LogoutModal from '@widgets/mypage/components/modal/logout-modal';
import WithdrawModal from '@widgets/mypage/components/modal/withdraw-modal';
import { useSocialLogout } from '@widgets/mypage/hooks/use-social-logout';
import { useSocialWithdraw } from '@widgets/mypage/hooks/use-social-withdraw';

import * as styles from './account-menu-bar.css';

const ACCOUNT_MENU_BAR_TEXT = {
  WITHDRAW: '회원탈퇴',
  LOGOUT: '로그아웃',
};

const AccountMenuBar = () => {
  const { kakaoLogout } = useSocialLogout();
  const { kakaoWithdraw } = useSocialWithdraw();
  const { openModal, closeModal } = useModal();

  const handleLogout = () => {
    openModal(
      <LogoutModal
        onConfirm={() => {
          closeModal();
          kakaoLogout();
        }}
        onCancel={closeModal}
      />,
    );
  };

  const handleWithdraw = () => {
    openModal(
      <WithdrawModal
        onConfirm={() => {
          closeModal();
          kakaoWithdraw();
        }}
        onCancel={closeModal}
      />,
    );
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
