import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import User from '@widgets/mypage/user';

const MyPage = () => {
  return (
    <>
      <Navigation
        title={'지욱님 반가워요'}
        rightIcon={<Icon name="home" color="white" />}
        backgroundColor="primary"
        textColor="white"
      />
      <User />
    </>
  );
};

export default MyPage;
