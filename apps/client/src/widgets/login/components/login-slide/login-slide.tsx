import { useState } from 'react';

import { Carousel, Chip, Indicator } from '@bds/ui';

import { LOGIN_TEXT } from '@widgets/login/constants/login-content';

import KakaoLoginButton from './kakao-login-button';
import SubTitle from './sub-title';
import Title from './title';

import * as styles from './login-slide.css';

const LoginSlide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (number: number) => {
    setCurrentIndex(number);
  };

  return (
    <div className={styles.body}>
      <section className={styles.bodyContainer}>
        <Carousel
          infinite={false}
          modules={['Navigation']}
          slidesPerView={1}
          className={styles.CarouselContainer}
          onSlideChange={handleSlideChange}
        >
          {LOGIN_TEXT.TITLE.map((_, idx) => (
            <Carousel.Item key={idx}>
              <section className={styles.slideImageSection}>
                <img
                  src={LOGIN_TEXT.IMAGE_URL[idx]}
                  width={'62%'}
                  alt={LOGIN_TEXT.ALT_TAG[idx]}
                />
                <div className={styles.contentTextContainer}>
                  <div className={styles.contentHeader}>
                    <Chip
                      label={LOGIN_TEXT.CHIP[idx]}
                      variant="square"
                      size="small"
                      fontColor="primary600"
                      backgroundColor="primary100"
                    />
                    <Title title={LOGIN_TEXT.TITLE[idx]} />
                  </div>
                  <SubTitle subtitle={LOGIN_TEXT.DESCRIPTION[idx]} />
                </div>
              </section>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
      <section className={styles.bottomContainer}>
        <div className={styles.indicatorContainer}>
          <Indicator current={currentIndex} total={2} />
        </div>
        <KakaoLoginButton />
      </section>
    </div>
  );
};

export default LoginSlide;
