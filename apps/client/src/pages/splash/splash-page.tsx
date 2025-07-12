import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon } from '@bds/ui/icons';

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
      <Icon name="logo_3d" width="14rem" height="10.7rem" />
      <Icon name="logotype_3d" width="15.9rem" height="5.4rem" />
    </div>
  );
};

export default SplashPage;
