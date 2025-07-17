import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import { FeaturesSection } from '@widgets/home/components/features-section/features-section.tsx';
import { InfoSection } from '@widgets/home/components/info-section/info-section.tsx';
import { RecommendedInfoSection } from '@widgets/home/components/info-section/recommended-info-section.tsx';

import { HOME_QUERY_OPTIONS } from '@shared/api/domain/home/queries.ts';
import { routePath } from '@shared/router/path.ts';

import * as styles from './home-page.css.ts';

import 'swiper/swiper-bundle.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const { data: userData } = useSuspenseQuery(HOME_QUERY_OPTIONS.USER_INFO());

  return (
    <section className={styles.homePage}>
      <Navigation
        rightIcon={
          <Icon
            name="user"
            className={styles.userIcon}
            color="white"
            onClick={() => {
              handleNavigate(routePath.MY);
            }}
          />
        }
        title={
          <Icon
            name="logotype_white"
            className={styles.logoIcon}
            onClick={() => {
              handleNavigate(routePath.HOME);
            }}
          />
        }
      />
      {userData?.isRecommendInsurance ? (
        <RecommendedInfoSection userName={userData.username} />
      ) : (
        <InfoSection />
      )}
      <FeaturesSection />
    </section>
  );
};

export default HomePage;
