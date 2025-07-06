import { Icon } from '@bds/icon';
import { Navigation } from '@bds/ui';

const HomePage = () => {
  return (
    <div>
      <Navigation
        leftIcon={<Icon name="caret_left_lg" />}
        rightIcon={<Icon name="home" />}
        title="정보입력"
      />
    </div>
  );
};

export default HomePage;
