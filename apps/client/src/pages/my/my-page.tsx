import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import Body from '@widgets/mypage/body';

import { USER_QUERY_OPTIONS } from '@shared/api/domain/mypage/queries';
import { routePath } from '@shared/router/path';

const MyPage = () => {
  const { data: profileData } = useQuery(USER_QUERY_OPTIONS.PROFILE());
  const userData = profileData?.data;

  const navigate = useNavigate();

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  return (
    <>
      <Navigation
        title={`${userData?.nickname}님 반가워요!`}
        rightIcon={
          <Icon
            name="home"
            color="white"
            onClick={() => handleNavigate(routePath.HOME)}
          />
        }
        backgroundColor="primary"
        textColor="white"
        hasZIndex={true}
        isSticky={true}
      />
      <Body
        profileImage={userData?.profileImageUrl}
        nickname={`${userData?.nickname}`}
        onClick={() => handleNavigate(routePath.REPORT)}
      />
    </>
  );
};

export default MyPage;
