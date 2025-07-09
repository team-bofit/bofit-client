import { Indicator } from '@bds/ui';

import Tip from '@widgets/home/components/tip/tip.tsx';

const HomePage = () => {
  return (
    <>
      HomePage
      <Tip
        title="보험 상령일이란?"
        contents="생일에 6개월을 더한 날로, 보험료 인상 기준이 돼요."
      />
      <Tip
        title="보험 상령일이란?"
        contents="생일에 6개월을 더한 날로, 보험료 인상 기준이 돼요."
        variant="gray"
      />
      <Indicator current={0} total={2} />
    </>
  );
};

export default HomePage;
