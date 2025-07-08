import { Floating, Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import Alert from '@widgets/community/components/alert/alert';
import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';

import * as styles from './community-page.css';

const CommunityPage = () => {
  return (
    <>
      <Navigation rightIcon={<Icon name="home" />} title="커뮤니티" />
      <Alert />
      <div className={styles.emptyPlaceholder}>
        <EmptyPlaceholder />
      </div>
      <Floating
        icon={<Icon name="edit" width={'100%'} height={'100%'} />}
        state="default"
        // onClick 작성
      />
    </>
  );
};

export default CommunityPage;
