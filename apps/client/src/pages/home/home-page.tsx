import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import { FeaturesSection } from '@widgets/home/components/features-section/features-section.tsx';
import { InfoSection } from '@widgets/home/components/info-section/info-section.tsx';

import * as styles from './home-page.css.ts';

const HomePage = () => {
  return (
    <section className={styles.homePage}>
      <Navigation
        rightIcon={
          <Icon name={'user'} className={styles.userIcon} color="white" />
        }
        title={<Icon name={'logotype_white'} className={styles.logoIcon} />}
      />
      <InfoSection />
      <FeaturesSection />
    </section>
  );
};

export default HomePage;
