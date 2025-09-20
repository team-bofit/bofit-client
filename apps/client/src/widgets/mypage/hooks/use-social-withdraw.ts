import { api } from '@shared/api/config/instance';
import { authService } from '@shared/auth/services/auth-service';
import { paths } from '@shared/types/schema';

export const useSocialWithdraw = () => {
  type WithdrawResponse =
    paths['/oauth/kakao/unlink']['delete']['responses']['200']['content']['*/*'];

  const kakaoWithdraw = async () => {
    try {
      await api.delete('oauth/kakao/unlink').json<WithdrawResponse>();

      authService.logout();
    } catch (error) {
      throw new Error('회원탈퇴에 실패하였습니다.');
    }
  };

  return { kakaoWithdraw };
};
