import { useNavigate } from 'react-router';

import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import CommunityBody from '@widgets/community/components/community-body/community-body';

import { routePath } from '@shared/router/path';

const CommunityPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => () => {
    navigate(path);
  };

  return (
    <>
      <Navigation
        rightIcon={<Icon name="home" />}
        onClickRight={handleNavigate(routePath.HOME)}
        title="커뮤니티"
      />

      <CommunityBody />
    </>
  );
};

export default CommunityPage;
