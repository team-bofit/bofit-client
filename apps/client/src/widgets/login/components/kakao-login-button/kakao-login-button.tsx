import { Icon } from '@bds/ui/icons';

import * as styles from './kakao-login-button.css';

const KakaoLoginButton = () => {
  return (
    <div className={styles.container}>
      <Icon name="kakaotalk" width="2.7rem" height="2.7rem" />
      <p className={styles.text}>카카오톡으로 시작하기</p>
    </div>
  );
};
export default KakaoLoginButton;
