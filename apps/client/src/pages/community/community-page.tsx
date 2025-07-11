import { Floating, Navigation } from '@bds/ui';
import { Alert } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';
import UserComment from '@widgets/community/components/user-comment/user-comment';
import { ALERT_CONTENT_BODY } from '@widgets/community/constant/alert_content';
import { EMPTY_POST } from '@widgets/community/constant/empty-content';

import * as styles from './community-page.css';

const CommunityPage = () => {
  return (
    <>
      <Navigation rightIcon={<Icon name="home" />} title="커뮤니티" />
      <Alert
        iconName="info"
        iconSize="2.4rem"
        type="info"
        alertContents={ALERT_CONTENT_BODY.BODY}
        alertHeader={ALERT_CONTENT_BODY.HEADER}
      />
      <br />
      <UserComment comment="저도요" nickName="닉네임" timestamp="10" />
      <br />
      <div className={styles.emptyPlaceholder}>
        <EmptyPlaceholder content={EMPTY_POST} />
      </div>

      <Floating
        icon={<Icon name="edit" width={'100%'} height={'100%'} />}
        state="default"
        // TODO onClick
      />
    </>
  );
};

export default CommunityPage;
