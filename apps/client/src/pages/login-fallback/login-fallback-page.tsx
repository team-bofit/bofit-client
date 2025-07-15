import { useLocation } from 'react-router-dom';

import { useSocialLogin } from '@widgets/login-fallback/hooks/use-social-login';

const LoginFallbackPage = () => {
  const location = useLocation();
  const { kakaoLogin } = useSocialLogin();

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  if (code) {
    (async () => {
      try {
        await kakaoLogin(code);
      } catch (error) {
        throw new Error('로그인에 실패하였습니다.');
      }
    })();
  }

  return;
};

export default LoginFallbackPage;
