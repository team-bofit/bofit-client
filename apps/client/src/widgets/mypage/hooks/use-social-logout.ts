import { api } from '@shared/api/config/instance';
import { authService } from '@shared/auth/services/auth-service';
import { appConfig } from '@shared/configs/app-config';
import { paths } from '@shared/types/schema';

export const useSocialLogout = () => {
  type LogoutResponse =
    paths['/oauth/kakao/logout']['post']['responses']['200']['content']['*/*'];

  const getRedirectUrl = () =>
    import.meta.env.MODE === 'development'
      ? appConfig.auth.kakaoLocalLogoutRedirectUrl
      : appConfig.auth.kakaoProdLogoutRedirectUrl;

  const kakaoLogout = async () => {
    const finalRedirectUrl = getRedirectUrl();

    try {
      await api
        .post(
          `oauth/kakao/logout?redirect-url=${encodeURIComponent(finalRedirectUrl)}`,
        )
        .json<LogoutResponse>();

      authService.logout();
    } catch (error) {
      throw new Error('카카오 로그아웃에 실패하였습니다.');
    }
  };

  return { kakaoLogout };
};
