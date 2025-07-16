import { useNavigate } from 'react-router';

import { Button } from '@bds/ui';

import * as styles from './error.css';

const ERROR_MESSAGES = {
  TITLE: '앗, 페이지를 찾을 수 없어요!',
  DESCRIPTION: [
    '메인화면으로 돌아가거나,\n 주소가 맞는지 다시 한 번 확인해 주세요!',
  ],
  BUTTON_TEXT: '메인화면',
};

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.errorContainer}>
      <img
        className={styles.errorImage}
        src="/glass_icon_error_3d.webp"
        alt="에러 페이지 이미지"
      />
      <p className={styles.errorTitle}>{ERROR_MESSAGES.TITLE}</p>
      <p className={styles.errorDescription}>{ERROR_MESSAGES.DESCRIPTION}</p>
      <div className={styles.buttonWrapper}>
        <Button variant="border" size="lg" onClick={handleClick}>
          {ERROR_MESSAGES.BUTTON_TEXT}
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
