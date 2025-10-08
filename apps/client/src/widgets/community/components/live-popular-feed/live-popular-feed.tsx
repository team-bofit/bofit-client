import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { Carousel, Indicator, Title } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import FeedCard from '@widgets/community/components/feed-card/feed-card';

import { COMMUNITY_QUERY_OPTIONS } from '@shared/api/domain/community/queries';
import { routePath } from '@shared/router/path';

import * as styles from './live-popular-feed.css';

const TOTAL_POPULAR_FEED = 3;

const LivePopularFeed = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: popularFeedData } = useQuery({
    ...COMMUNITY_QUERY_OPTIONS.POPULAR_FEED(TOTAL_POPULAR_FEED),
  });
  const navigate = useNavigate();

  const handleGoToDetailPage = (postId: number | undefined) => {
    navigate(routePath.COMMUNITY_DETAIL.replace(':postId', String(postId)));
  };

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
        {popularFeedData?.data?.posts?.map(
          ({ title, content, commentCount, likeCount, postId }, index) => (
            <Carousel.Item key={index} className={styles.carouselItem}>
              <FeedCard
                title={title ?? ''}
                content={content ?? ''}
                commentCount={commentCount ?? 0}
                likeCount={likeCount ?? 0}
                onClick={() => handleGoToDetailPage(postId)}
              />
            </Carousel.Item>
          ),
        )}
      </Carousel>

      <div className={styles.indicatorWrapper}>
        <Indicator current={currentPage} total={TOTAL_POPULAR_FEED} />
      </div>
    </div>
  );
};

export default LivePopularFeed;
