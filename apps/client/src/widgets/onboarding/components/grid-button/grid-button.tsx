import { Title } from '@bds/ui';

import Button from '../button/button';

import * as styles from './grid-button.css';

const GridButton = () => {
  return (
    <>
      <Title fontStyle={'bd_sm'}>
        {`최근 5년 이내 병원에서 다음 질병을\n 진단 또는 치료받은 적 있나요?`}
      </Title>
      <p className={styles.description}>
        정확한 추천을 위해 모두 선택해주세요.{' '}
      </p>
      <section className={styles.grid}>
        <Button text="암" selected={false} />
        <Button text="뇌혈관질환" subText="뇌출혈, 뇌경색" selected={false} />
        <Button text="심장질환" selected={false} />
        <Button text="호흡기질환" selected={false} />
        <Button text="간질환" selected={false} />
        <Button text="신장질환" selected={false} />
        <Button text="정신질환" selected={false} />
        <Button text="만성질환" subText="고혈압, 당뇨 등" selected={false} />
        <Button text="해당없음" selected={false} />
      </section>
    </>
  );
};

export default GridButton;
