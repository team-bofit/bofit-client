import { useNavigate } from 'react-router';

import * as styles from './error.css';

const ERROR_MESSAGES = {
  title: '앗, 페이지를 찾을 수 없어요!',
  description: [
    '메인화면으로 돌아가거나,\n 주소가 맞는지 다시 한 번 확인해 주세요!',
  ],
  buttonText: '메인화면',
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
        src="./error_3d_icon.webp"
        alt="Error"
      />
      <p className={styles.errorTitle}>{ERROR_MESSAGES.title}</p>
      <p className={styles.errorDescription}>{ERROR_MESSAGES.description}</p>
      <button className={styles.errorButton} onClick={handleClick}>
        {ERROR_MESSAGES.buttonText}
      </button>
    </div>
  );
};

export default ErrorPage;
