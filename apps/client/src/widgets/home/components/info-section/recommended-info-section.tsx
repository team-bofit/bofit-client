import { useMemo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { IconName } from 'node_modules/@bds/ui/src/icons/icon-list.ts';
import { useNavigate } from 'react-router-dom';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Chip, TextButton } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import HomeChip from '@widgets/home/components/home-chip/home-chip.tsx';
import { homeChipConfig } from '@widgets/home/configs/home-chip-config.ts';

import { HOME_QUERY_OPTIONS } from '@shared/api/domain/home/queries.ts';
import InsuranceSubtitle from '@shared/components/insurance-subtitle/insurance-subtitle.tsx';
import InsuranceTitle from '@shared/components/insurance-title/insurance-title.tsx';
import { routePath } from '@shared/router/path.ts';
import { StatusType } from '@shared/types/type.ts';

import * as styles from './recommended-info-section.css.ts';

/** 보험 추천받은 유저가 볼 화면 */
export const RecommendedInfoSection = () => {
  const navigate = useNavigate();
  const handleNavigateReport = () => {
    navigate(routePath.REPORT);
  };

  const { data: reportSummary } = useSuspenseQuery(
    HOME_QUERY_OPTIONS.REPORT_SUMMARY(),
  );
  const targetToIconMap = new Map(
    homeChipConfig.map(({ target, icon }) => [target, icon]),
  );

  const chipList = useMemo(() => {
    if (!reportSummary?.statuses) {
      return [];
    }

    return [...reportSummary.statuses, ...reportSummary.statuses].map(
      (chip, index) => ({
        key: index,
        title: chip.target || '',
        status: chip.status as StatusType,
        icon: targetToIconMap.get(chip.target || '') as IconName,
      }),
    );
  }, [reportSummary?.statuses, targetToIconMap]);

  if (!reportSummary) {
    return;
  }

  return (
    <section className={styles.infoSection}>
      <img
        src={'./3Dicon_background.webp'}
        width={223}
        height={185}
        className={styles.backgroundLogo}
      />
      <div className={styles.titleSection}>
        <InsuranceSubtitle
          name={'민정'}
          type={'home'}
          fontColor={'primary100'}
          fontStyle={'sb_14'}
          style={{ marginBottom: '4px' }}
        />
        <InsuranceTitle
          fontColor={'white'}
          fontStyle={'eb_28'}
          name={reportSummary.productName}
          company={reportSummary.company}
        />
        <div className={styles.chipList}>
          {reportSummary.keywordChips?.map((chip, index) => (
            <Chip
              key={index}
              label={`# ${chip}`}
              fontColor="gray"
              backgroundColor="primary200"
              shape="rounded"
              zIndex={'content'}
            />
          ))}
        </div>
      </div>
      <Swiper
        spaceBetween={8}
        slidesPerView="auto"
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1500}
        modules={[Autoplay]}
        allowTouchMove={true}
        centeredSlides={true}
        className={styles.homeChipList}
      >
        {chipList.map((chip, index) => {
          return (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
              <HomeChip
                icon={<Icon name={chip.icon} className={styles.homeChipIcon} />}
                title={chip.title}
                status={chip.status as StatusType}
              />
            </SwiperSlide>
          );
        })}
        {reportSummary.statuses?.map((chip, index) => {
          const iconName = targetToIconMap.get(chip.target || '');
          return (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
              <HomeChip
                icon={
                  <Icon
                    name={iconName as IconName}
                    className={styles.homeChipIcon}
                  />
                }
                title={chip.target || ''}
                status={chip.status as StatusType}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className={styles.bottomButton}>
        <TextButton color={'white'} onClick={handleNavigateReport}>
          <p>구체적인 내용 확인하기</p>
          <Icon name={'caret_right_md'} color="white" />
        </TextButton>
      </div>
    </section>
  );
};
