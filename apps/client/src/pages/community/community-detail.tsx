import { useParams } from 'react-router';

import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import DetailSection from '@widgets/community/components/detail-section/detail-section';

import { useNavigateTo } from '@shared/hooks/use-navigate-to';
import { routePath } from '@shared/router/path';

const CommunityDetail = () => {
  const { postId } = useParams<{ postId: string }>();

  if (!postId) {
    throw new Error('postId가 존재하지 않습니다.');
  }

  return (
    <>
      <Navigation
        title="커뮤니티"
        leftIcon={<Icon name="caret_left_lg" width="2.4rem" height="2.4rem" />}
        onClickLeft={useNavigateTo(-1)}
        rightIcon={<Icon name="home" />}
        onClickRight={useNavigateTo(routePath.HOME)}
      />

      <DetailSection postId={postId} />
    </>
  );
};

export default CommunityDetail;
