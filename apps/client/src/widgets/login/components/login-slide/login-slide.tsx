import { useState } from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Chip, Indicator } from '@bds/ui';

import { LOGIN_TEXT } from '@widgets/login/constants/login-content';

import KakaoLoginButton from './kakao-login-button';
import SubTitle from './sub-title';
import Title from './title';

import * as styles from './login-slide.css';

const LoginSlide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentIndex(swiper.realIndex);
  };

  return (
    <div className={styles.body}>
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, stopOnLastSlide: true }}
        speed={500}
        onSlideChange={handleSlideChange}
      >
        {LOGIN_TEXT.TITLE.map((_, idx) => (
          <SwiperSlide key={idx}>
            <section className={styles.slideImageSection}>
              <img
                src={LOGIN_TEXT.IMAGE_URL[idx]}
                width={'65%'}
                alt={LOGIN_TEXT.ALT_TAG[idx]}
              />
              <div className={styles.contentTextContainer}>
                <div className={styles.contentHeader}>
                  <Chip
                    label={LOGIN_TEXT.CHIP[idx]}
                    fontColor="primary"
                    backgroundColor="primary100"
                    shape="rectangular"
                  />
                  <Title title={LOGIN_TEXT.TITLE[idx]} />
                </div>
                <SubTitle subtitle={LOGIN_TEXT.DESCRIPTION[idx]} />
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
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
