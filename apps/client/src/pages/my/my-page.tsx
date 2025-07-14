import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import Body from '@widgets/mypage/body';

const MyPage = () => {
  return (
    <>
      <Navigation
        title={'지욱님 반가워요!'}
        rightIcon={<Icon name="home" color="white" />}
        backgroundColor="primary"
        textColor="white"
        hasZIndex={true}
      />
      <Body nickname={'지욱'} />
    </>
  );
};

export default MyPage;
