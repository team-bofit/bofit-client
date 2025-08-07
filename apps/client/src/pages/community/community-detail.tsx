import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import DetailSection from '@widgets/community/components/detail-section/detail-section';

import { routePath } from '@shared/router/path';

const CommunityDetail = () => {
  const navigate = useNavigate();

  const { postId } = useParams<{ postId: string }>();

  if (!postId) {
    throw new Error('postId가 존재하지 않습니다.');
  }

  const handleNavigate = (path: string | number) => {
    if (typeof path === 'string') {
      navigate(path);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <Navigation
        title="커뮤니티"
        leftIcon={<Icon name="caret_left_lg" width="2.4rem" height="2.4rem" />}
        onClickLeft={() => handleNavigate(-1)}
        rightIcon={<Icon name="home" />}
        onClickRight={() => handleNavigate(routePath.HOME)}
      />

      <DetailSection postId={postId} />
    </>
  );
};

export default CommunityDetail;
