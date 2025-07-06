import { Icon } from '@bds/icon';
import { toasts } from '@bds/ui';

const HomePage = () => {
  const handleClick = () => {
    toasts.show({
      message: '3순위까지만 선택할 수 있어요',
      duration: 5000,
      icon: <Icon name="check" color="primary500" />,
    });
  };

  return (
    <div>
      home-page 배포 테스트입니다 하룰라라
      <Icon name="add" />
      <button onClick={handleClick}>토스트 띄우기</button>
    </div>
  );
};

export default HomePage;
