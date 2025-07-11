import { useModal } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import KaKaoLoginModal from './kakao-login-modal';

import * as styles from './kakao-login-button.css';

const KakaoLoginButton = () => {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal(<KaKaoLoginModal />);
  };

  return (
    <div className={styles.container} onClick={handleOpenModal}>
      <Icon name="kakaotalk" width="2.7rem" height="2.7rem" />
      <p className={styles.text}>카카오톡으로 시작하기</p>
    </div>
  );
};

export default KakaoLoginButton;
