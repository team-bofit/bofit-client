import { useState } from 'react';

import { Indicator, Title } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import FeedCard from '@widgets/community/components/feed-card/feed-card';
import { MOCK_FEED_CARD } from '@widgets/community/constant/mock-popular-feed';

import * as styles from './live-popular-feed.css';

const LivePopularFeed = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const el = e.currentTarget;
    const gap = 16;
    const pageWidth = el.clientWidth;
    const idx = Math.round(el.scrollLeft / (pageWidth + gap));
    setCurrentPage(Math.max(0, Math.min(idx, MOCK_FEED_CARD.length - 1)));
  };

  // @TODO 실시간 인기 게시글 API 연동

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
      <div className={styles.carousel} onScroll={handleScroll}>
        {MOCK_FEED_CARD.map(
          ({ id, title, content, commentCount, likeCount }) => (
            <div key={id}>
              <FeedCard
                title={title}
                content={content}
                commentCount={commentCount}
                likeCount={likeCount}
                onClick={() => {
                  // @TODO 해당 CommunityDetail로 이동
                }}
              />
            </div>
          ),
        )}
      </div>

      <div className={styles.indicatorWrapper}>
        <Indicator current={currentPage} total={3} />
      </div>
    </div>
  );
};

export default LivePopularFeed;
