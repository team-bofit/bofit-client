import ky from '@toss/ky';
import { useNavigate } from 'react-router';

import { tokenService } from '@shared/auth/services/token-service';
import { routePath } from '@shared/router/path';
import { paths } from '@shared/types/schema';

export const useSocialLogin = () => {
  const navigate = useNavigate();
  type KakaoResponse =
    paths['/oauth/kakao/login']['get']['responses']['200']['content']['*/*']['data'];

  const kakaoLogin = async (code: string) => {
    if (!code) {
      throw new Error('코드가 존재하지 않습니다.');
    }

    try {
      const response = await ky
        .get(
          `${import.meta.env.VITE_API_BASE_URL}/oauth/kakao/login?code=${code}`,
        )
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
