import { useState } from 'react';

import { Carousel, Indicator, Title } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import FeedCard from '@widgets/community/components/feed-card/feed-card';
import { MOCK_FEED_CARD } from '@widgets/community/constant/mock-popular-feed';

import * as styles from './live-popular-feed.css';

const LivePopularFeed = () => {
  // @TODO 실시간 인기 게시글 API 연동
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Icon
          name="ai_fill"
          width="2.4rem"
          height="2.4rem"
          color="bofitOrange"
        />
        <Title fontStyle="bd_sm">실시간 인기 게시글</Title>
      </div>
      <Carousel
        slidesPerView={'auto'}
        modules={['Pagination']}
        infinite={false}
        onSlideChange={(index: number) => setCurrentPage(index)}
        onSlideEnd={() => setCurrentPage(2)}
        className={styles.carousel}
      >
        {MOCK_FEED_CARD.map(
          ({ id, title, content, commentCount, likeCount }) => (
            <Carousel.Item key={id} className={styles.carouselItem}>
              <FeedCard
                title={title}
                content={content}
                commentCount={commentCount}
                likeCount={likeCount}
                onClick={() => {
                  // @TODO 해당 CommunityDetail로 이동
                }}
              />
            </Carousel.Item>
          ),
        )}
      </Carousel>

      <div className={styles.indicatorWrapper}>
        <Indicator current={currentPage} total={3} />
      </div>
    </div>
  );
};

export default LivePopularFeed;
