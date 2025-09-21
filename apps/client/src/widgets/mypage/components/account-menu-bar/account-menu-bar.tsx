import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TextButton, useModal } from '@bds/ui';

import LogoutModal from '@widgets/mypage/components/modal/logout-modal';
import WithdrawModal from '@widgets/mypage/components/modal/withdraw-modal';

import { USER_MUTATION_OPTIONS } from '@shared/api/domain/mypage/queries';
import { USER_QUERY_KEY } from '@shared/api/keys/query-key';
import { authService } from '@shared/auth/services/auth-service';
import { routePath } from '@shared/router/path';

import * as styles from './account-menu-bar.css';

const AccountMenuBar = () => {
  const queryClient = useQueryClient();

  const { mutate: kakaoLogout } = useMutation({
    ...USER_MUTATION_OPTIONS.KAKAO_LOGOUT(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY.ALL,
      });

      authService.logout();
    },
  });

  const { mutate: kakaoWithdraw } = useMutation({
    ...USER_MUTATION_OPTIONS.KAKAO_WITHDRAW(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY.ALL,
      });

      authService.logout();
    },
  });
  const { openModal, closeModal } = useModal();

  const handleLogout = () => {
    openModal(
      <LogoutModal
        onLogout={() => {
          closeModal();
          kakaoLogout(window.location.origin + routePath.LOGIN);
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
      <TextButton color="black" size="sm" onClick={handleWithdraw}>
        회원탈퇴
      </TextButton>
      <div className={styles.horizontalDivider} />
      <TextButton color="black" size="sm" onClick={handleLogout}>
        로그아웃
      </TextButton>
    </div>
  );
};

export default AccountMenuBar;
