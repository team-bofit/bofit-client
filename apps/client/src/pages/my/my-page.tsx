import { useState } from 'react';

import { Slider } from '@bds/ui';

const MyPage = () => {
  const [value, setValue] = useState<[number, number]>([7, 15]);

  const handleChange = (newValue: [number, number]) => {
    setValue(newValue);
  };
  return (
    <div>
      <div style={{ padding: '2rem' }}>
        <Slider
          min={0}
          max={30}
          value={value}
          onChange={handleChange}
          defaultValue={[7, 15]}
        />
      </div>
    </div>
  );
};

export default MyPage;
