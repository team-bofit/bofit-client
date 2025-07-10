import { Alert, Floating, Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';
import { ALERT_CONTENT_BODY } from '@widgets/community/constant/alert_content';
import { EMPTY_POST } from '@widgets/community/constant/empty-content';

import * as styles from './community-page.css';

const CommunityPage = () => {
  return (
    <div>
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
        //onClick to @커뮤니티_글_작성 화면
      />
    </div>
  );
};

export default CommunityPage;
