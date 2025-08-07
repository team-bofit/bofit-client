import { Icon } from '@bds/ui/icons';

import { appConfig } from '@shared/configs/app-config';

import * as styles from './kakao-login-button.css';

const KakaoLoginButton = () => {
  const handleKakaoLogin = () => {
    const redirectUri =
      window.location.hostname === 'localhost'
        ? appConfig.auth.kakaoLocalRedirectUrl
        : appConfig.auth.kakaoProdRedirectUrl;

    const loginUrl = `${appConfig.auth.kakaoLoginUrl}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = loginUrl;
  };

  return (
    <div className={styles.container} onClick={handleKakaoLogin}>
      <Icon name="kakaotalk" width="2.7rem" height="2.7rem" />
      <p className={styles.text}>카카오톡으로 시작하기</p>
    </div>
  );
};

export default KakaoLoginButton;
