import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import CommunityPreview from '@widgets/community/components/community-preview/community-preview';

import { useNavigateTo } from '@shared/hooks/use-navigate-to';
import { routePath } from '@shared/router/path';

const CommunityPage = () => {
  return (
    <>
      <Navigation
        rightIcon={<Icon name="home" />}
        searchIcon={<Icon name="search" />}
        onClickRight={useNavigateTo(routePath.HOME)}
        onClickSearch={useNavigateTo(routePath.COMMUNITY_SEARCH)}
        title="커뮤니티"
      />

      <CommunityPreview />
    </>
  );
};

export default CommunityPage;
