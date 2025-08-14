import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import CommunityBody from '@widgets/community/components/community-body/community-body';

import { useNavigateTo } from '@shared/hooks/use-navigate-to';
import { routePath } from '@shared/router/path';

const CommunityPage = () => {
  return (
    <>
      <Navigation
        rightIcon={<Icon name="home" />}
        onClickRight={useNavigateTo(routePath.HOME)}
        title="커뮤니티"
      />

      <CommunityBody />
    </>
  );
};

export default CommunityPage;
