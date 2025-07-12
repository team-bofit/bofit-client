import { useNavigate } from 'react-router-dom';

import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import { FeaturesSection } from '@widgets/home/components/features-section/features-section.tsx';
import { InfoSection } from '@widgets/home/components/info-section/info-section.tsx';
import { RecommendedInfoSection } from '@widgets/home/components/info-section/recommended-info-section.tsx';

import { routePath } from '@shared/router/path.ts';

import * as styles from './home-page.css.ts';

const HomePage = () => {
  const navigate = useNavigate();
  const isRecommended = false;

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <section className={styles.homePage}>
      <Navigation
        rightIcon={
          <Icon
            name={'user'}
            className={styles.userIcon}
            color="white"
            onClick={() => {
              handleNavigate(routePath.MY);
            }}
          />
        }
        title={
          <Icon
            name={'logotype_white'}
            className={styles.logoIcon}
            onClick={() => {
              handleNavigate(routePath.HOME);
            }}
          />
        }
      />
      {isRecommended ? <RecommendedInfoSection /> : <InfoSection />}
      <FeaturesSection />
    </section>
  );
};

export default HomePage;
