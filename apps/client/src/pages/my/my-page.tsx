import { useNavigate } from 'react-router';

import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import Body from '@widgets/mypage/body';

import { routePath } from '@shared/router/path';

const MyPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  return (
    <>
      <Navigation
        title={'지욱님 반가워요!'}
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
      />
      <Body nickname="지욱" onClick={() => handleNavigate(routePath.REPORT)} />
    </>
  );
};

export default MyPage;
