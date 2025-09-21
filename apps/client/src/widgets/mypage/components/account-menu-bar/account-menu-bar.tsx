import { TextButton, useModal } from '@bds/ui';

import LogoutModal from '@widgets/mypage/components/modal/logout-modal';
import WithdrawModal from '@widgets/mypage/components/modal/withdraw-modal';
import { useSocialLogout } from '@widgets/mypage/hooks/use-social-logout';
import { useSocialWithdraw } from '@widgets/mypage/hooks/use-social-withdraw';

import * as styles from './account-menu-bar.css';

const AccountMenuBar = () => {
  const { kakaoLogout } = useSocialLogout();
  const { kakaoWithdraw } = useSocialWithdraw();
  const { openModal, closeModal } = useModal();

  const handleLogout = () => {
    openModal(
      <LogoutModal
        onLogout={() => {
          closeModal();
          kakaoLogout();
        }}
        onCancelLogout={closeModal}
      />,
    );
  };

  const handleWithdraw = () => {
    openModal(
      <WithdrawModal
        onWithdraw={() => {
          closeModal();
          kakaoWithdraw();
        }}
        onCancelWithdraw={closeModal}
      />,
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftButtonWrapper}>
        <TextButton color="black" size="sm" onClick={handleWithdraw}>
          회원탈퇴
        </TextButton>
      </div>
      <TextButton color="black" size="sm" onClick={handleLogout}>
        로그아웃
      </TextButton>
    </div>
  );
};

export default AccountMenuBar;
