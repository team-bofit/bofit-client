import { useNavigate } from 'react-router';

import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import { routePath } from '@shared/router/path.ts';

import * as styles from './home-top-section.css.ts';

export const HomeTopSection = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(routePath.MY);
  };

  return (
    <>
      <Navigation
        title={
          <Icon
            width={72}
            height={21}
            name={'logotype'}
            className={styles.logotypeIcon}
          />
        }
        rightIcon={
          <Icon
            name={'user'}
            onClick={handleNavigate}
            className={styles.userIcon}
          />
        }
      />
    </>
  );
};
