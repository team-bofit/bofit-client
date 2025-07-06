import { Icon } from '@bds/icon';
import { Button } from '@bds/ui';

const HomePage = () => {
  return (
    <div style={{ backgroundColor: 'white' }}>
      home-page 배포 테스트입니다 하룰라라
      <Icon name="add" />
      <Button variant="primary" size="small" onClick={() => alert('zz')}>
        primary
      </Button>
      <Button variant="primary">primary</Button>
      <Button variant="primary" size="large">
        primary
      </Button>
      <Button variant="primary" disabled onClick={() => alert('zz')}>
        primary
      </Button>
      <Button variant="error">primary</Button>
      <Button variant="error" disabled>
        primary
      </Button>
      <Button variant="border">primary</Button>
      <Button variant="border" disabled>
        primary
      </Button>
    </div>
  );
};

export default HomePage;
