import { useEffect } from 'react';
import { Icon } from '@bds/ui/icons';
import { useNavigate } from 'react-router-dom';

import { routePath } from '@shared/router/path';

import * as styles from './splash-page.css';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(routePath.LOGIN);
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <Icon name="logo_3d" width="14.0061rem" height="10.7rem" />
      <Icon name="logotype_3d" width="15.9rem" height="5.4rem" />
    </div>
  );
};

export default SplashPage;
