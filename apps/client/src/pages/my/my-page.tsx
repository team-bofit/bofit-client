import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import Body from '@widgets/mypage/body';

import { USER_QUERY_OPTIONS } from '@shared/api/domain/mypage/queries';
import { routePath } from '@shared/router/path';

const MyPage = () => {
  const { data: queryData } = useSuspenseQuery(USER_QUERY_OPTIONS.PROFILE());
  const userData = queryData?.data;

  const targetRoute = userData?.isRecommendInsurance
    ? routePath.REPORT
    : routePath.HOME;

  const navigate = useNavigate();

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  return (
    <>
      <Navigation
        title={`${userData?.nickname}님 반가워요!`}
        rightIcon={<Icon name="home" color="white" />}
        onClickRight={() => handleNavigate(routePath.HOME)}
        backgroundColor="primary"
        textColor="white"
        hasZIndex={true}
        isSticky={true}
      />
      <Body
        profileImage={userData?.profileImageUrl}
        nickname={`${userData?.nickname}`}
        isRecommendInsurance={userData?.isRecommendInsurance}
        onClick={() => handleNavigate(targetRoute)}
      />
    </>
  );
};

export default MyPage;
