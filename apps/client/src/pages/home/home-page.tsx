import { Icon } from '@bds/icon';
import { Navigation } from '@bds/ui';

const HomePage = () => {
  return (
    <div>
      <Navigation
        leftIcon={<Icon name="arrow_left" color="white" />}
        rightIcon={<Icon name="home" color="white" />}
        title="보허미님 반가워요!"
        textColor="white"
        backgroundColor="primary"
      />
    </div>
  );
};

export default HomePage;
