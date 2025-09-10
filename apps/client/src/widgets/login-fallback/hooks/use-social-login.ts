import ky from '@toss/ky';
import { useNavigate } from 'react-router';

import { tokenService } from '@shared/auth/services/token-service';
import { appConfig } from '@shared/configs/app-config';
import { routePath } from '@shared/router/path';
import { paths } from '@shared/types/schema';

export const useSocialLogin = () => {
  const navigate = useNavigate();
  type KakaoResponse =
    paths['/oauth/kakao/login']['post']['responses']['200']['content']['*/*']['data'];

  const getRedirectUrl = () =>
    import.meta.env.MODE === 'development'
      ? appConfig.auth.kakaoLocalRedirectUrl
      : appConfig.auth.kakaoProdRedirectUrl;

  const kakaoLogin = async (code: string) => {
    if (!code) {
      throw new Error('코드가 존재하지 않습니다.');
    }

    const redirectUrl = getRedirectUrl();

    try {
      const response = await ky
        .post(`${appConfig.api.baseUrl}/oauth/kakao/login`, {
          json: { code, redirectUrl },
        })
        .json<KakaoResponse>();

      const { accessToken, refreshToken } = response.data;
      tokenService.saveAccessToken(accessToken);
      tokenService.saveRefreshToken(refreshToken);

      if (tokenService.getGoToOnboardingToken() == null) {
        navigate(routePath.ONBOARDING);
        tokenService.saveGoToOnboardingToken('false');
      } else {
        navigate(routePath.HOME);
      }
    } catch (error) {
      throw new Error('카카오 로그인에 실패하였습니다.');
    }
  };

  return { kakaoLogin };
};
