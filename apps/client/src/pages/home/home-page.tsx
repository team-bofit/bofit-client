import { Icon } from '@bds/icon';
import { Floating } from '@bds/ui';

const HomePage = () => {
  return (
    <div>
      home-page 배포 테스트입니다 하룰라라
      <Icon name="add" />
      <Floating
        icon={<Icon name="edit" width={'100%'} height={'100%'} />}
        state="default"
      />
    </div>
  );
};

export default HomePage;
