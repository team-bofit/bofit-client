import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import Search from '@widgets/community/components/search/search';

import { useNavigateTo } from '@shared/hooks/use-navigate-to';

const CommunitySearch = () => {
  return (
    <>
      <Navigation
        leftIcon={<Icon name="caret_left_lg" size={24} />}
        onClickLeft={useNavigateTo(-1)}
        title="커뮤니티 검색"
      />
      <Search />
    </>
  );
};

export default CommunitySearch;
