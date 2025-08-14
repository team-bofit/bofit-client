import { useInfiniteQuery } from '@tanstack/react-query';

import { Alert, Floating } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import FeedList from '@widgets/community/components/feed-list/feed-list';
import { ALERT_CONTENT_BODY } from '@widgets/community/constant/alert-content';

import { COMMUNITY_QUERY_OPTIONS } from '@shared/api/domain/community/queries';
import { useNavigateTo } from '@shared/hooks/use-navigate-to';
import { routePath } from '@shared/router/path';

import * as styles from './community-preview.css';
const CommunityPreview = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      ...COMMUNITY_QUERY_OPTIONS.POSTS(),
    });

  return (
    <>
      <Alert
        iconName="info"
        iconSize="2.4rem"
        alertHeader={ALERT_CONTENT_BODY.HEADER}
        alertContents={ALERT_CONTENT_BODY.BODY}
        type="info"
      />

      <FeedList
        data={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />

      <div className={styles.bottomFloating}>
        <Floating
          icon={<Icon name="edit" width={'100%'} height={'100%'} />}
          state="default"
          onClick={useNavigateTo(routePath.COMMUNITY_WRITE)}
        />
      </div>
    </>
  );
};

export default CommunityPreview;
