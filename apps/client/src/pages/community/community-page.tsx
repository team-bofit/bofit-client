import { useNavigate } from 'react-router';

import { Alert, Floating, Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';
import { ALERT_CONTENT_BODY } from '@widgets/community/constant/alert-content';
import { EMPTY_POST } from '@widgets/community/constant/empty-content';

import { routePath } from '@shared/router/path';

import * as styles from './community-page.css';

const CommunityPage = () => {
  const navigation = useNavigate();

  const onClick = () => {
    navigation(routePath.COMMUNITY_WRITE);
  };

  return (
    <div className={styles.container}>
      <Navigation rightIcon={<Icon name="home" />} title="커뮤니티" />
      <Alert
        iconName="info"
        iconSize="2.4rem"
        alertHeader={ALERT_CONTENT_BODY.HEADER}
        alertContents={ALERT_CONTENT_BODY.BODY}
        type="info"
      />
      <div className={styles.emptyPlaceholder}>
        <EmptyPlaceholder content={EMPTY_POST} />
      </div>

      <Floating
        icon={<Icon name="edit" width={'100%'} height={'100%'} />}
        state="default"
        onClick={onClick}
      />
    </div>
  );
};

export default CommunityPage;
