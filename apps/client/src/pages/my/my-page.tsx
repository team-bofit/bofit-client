import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import Body from '@widgets/mypage/components/body/body';

import { USER_QUERY_OPTIONS } from '@shared/api/domain/mypage/queries';
import { useNavigateTo } from '@shared/hooks/use-navigate-to';
import { routePath } from '@shared/router/path';

const MyPage = () => {
  const { data: queryData } = useSuspenseQuery(USER_QUERY_OPTIONS.PROFILE());
  const userData = queryData?.data;

  const navigate = useNavigate();

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  return (
    <>
      <Navigation
        title="마이페이지"
        rightIcon={<Icon name="home" color="white" />}
        searchIcon={<Icon name="search" color="white" />}
        onClickSearch={useNavigateTo(routePath.COMMUNITY_SEARCH)}
        onClickRight={() => handleNavigate(routePath.HOME)}
        backgroundColor="primary"
        textColor="white"
        hasZIndex={true}
        isSticky={true}
      />
      <Body
        profileImage={userData?.profileImageUrl}
        nickname={`${userData?.nickname}`}
      />
    </>
  );
};

export default MyPage;
