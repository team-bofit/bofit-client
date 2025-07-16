import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useSocialLogin } from '@widgets/login-fallback/hooks/use-social-login';

const LoginFallbackPage = () => {
  const location = useLocation();
  const { kakaoLogin } = useSocialLogin();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    if (code) {
      kakaoLogin(code).catch(() => {
        throw new Error('로그인에 실패하였습니다.');
      });
    }
  }, [location.search, kakaoLogin]);

  return null;
};

export default LoginFallbackPage;
