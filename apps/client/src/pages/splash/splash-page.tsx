import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { routePath } from '@shared/router/path';

import * as styles from './splash-page.css';

const SPLASH_TIMEOUT = 2000;

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(routePath.LOGIN);
    }, SPLASH_TIMEOUT);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <img src="/logo_3d.webp" alt="보핏 로고" className={styles.logo} />
      <img
        src="/logotype_3d.webp"
        alt="보핏 로고타입"
        className={styles.logotype}
      />
    </div>
  );
};

export default SplashPage;
