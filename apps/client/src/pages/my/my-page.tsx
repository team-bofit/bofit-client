import { Slider } from '@bds/ui';

const MyPage = () => {
  return (
    <div>
      <div style={{ padding: '2rem' }}>
        <Slider minValue={0} maxValue={30} defaultValue={[7, 15]} />
      </div>
    </div>
  );
};

export default MyPage;
