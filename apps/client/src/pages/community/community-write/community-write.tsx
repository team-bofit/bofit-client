import { Floating, Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import Alert from '@widgets/community/components/alert/alert';
import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';
import { EMPTY_POST } from '@widgets/community/constant/empty-content';

import * as styles from './community-write.css';

const CommunityWrite = () => {
  return (
    <div>
      <Navigation rightIcon={<Icon name="home" />} title="커뮤니티" />
      <Alert />
      <div className={styles.emptyPlaceholder}>
        <EmptyPlaceholder content={EMPTY_POST} />
      </div>
      <Floating
        icon={<Icon name="edit" width={'100%'} height={'100%'} />}
        state="default"
        // TODO onClick
      />
    </div>
  );
};

export default CommunityWrite;
