import { Slider } from '@bds/ui';

import Info from '@widgets/report/components/info/info';

import Title from '../../title/title';

import * as styles from './price-info.css';

const PRICE_TITLE = '보험정보';
const PRICE_DESCRIPTION = `보험료는 얼마 정도로\n생각하고 계신가요?`;
const PRICE_CAPTION = '슬라이더를 움직여 보험료 범위를 정해주세요.';
const SLIDER_LABEL = '희망 보험료';
const SLIDER_VALUE = (min: number, max: number) => `월 ${min}만원~${max}만원`;
const INFO_DESCRIPTION =
  '다른 사람들은 평균적으로 월 7~15만원 사이를 보험비로 지불하고 있어요.';

interface PriceInfoProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

const PriceInfo = ({ priceRange, setPriceRange }: PriceInfoProps) => {
  return (
    <section className={styles.priceContainer}>
      <div className={styles.titleContainer}>
        <Title
          title={PRICE_TITLE}
          description={PRICE_DESCRIPTION}
          caption={PRICE_CAPTION}
        />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.sliderContainer}>
          <div className={styles.textContainer}>
            <p className={styles.sliderLabel}>{SLIDER_LABEL}</p>
            <p className={styles.sliderValue}>
              {SLIDER_VALUE(priceRange[0], priceRange[1])}
            </p>
          </div>
          <Slider
            min={0}
            max={30}
            value={priceRange}
            onChange={(val) => setPriceRange(val)}
            defaultValue={[7, 15]}
          />
        </div>
        <Info description={INFO_DESCRIPTION} size="md" iconSize="2rem" />
      </div>
    </section>
  );
};

export default PriceInfo;
