import { useState } from 'react';

import { Indicator, Title } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import FeedCard from '@widgets/community/components/feed-card/feed-card';

import * as styles from './live-popular-feed.css';

const MOCK_FEED_CARD = [
  {
    id: 1,
    title: '제목',
    content:
      '저만 삼성생명 건강보험 괜찮나요?? 다른 후기들을 보니까 다 별로라 하던데 전 그냥 어쩌구 저쩌구~',
    commentCount: 88,
    likeCount: 21,
  },
  {
    id: 2,
    title: '제목2',
    content:
      '저만 삼성생명 건강보험 안 괜찮나요?? 다른 후기들을 안 보니까 다 좋다고 하던데 전 그냥 어쩌구 저쩌구~',
    commentCount: 32,
    likeCount: 41,
  },
  {
    id: 3,
    title: '제목3',
    content:
      'Cursor를 무료 체험판이 끝남. 다시 손코딩 하려고 하니 타자 치는 맛이 있네요. 너무 재밌어요',
    commentCount: 1,
    likeCount: 21,
  },
];

const LivePopularFeed = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const el = e.currentTarget;
    const gap = 16; // 1rem
    const pageWidth = el.clientWidth; // slide가 100%일 때
    const idx = Math.round(el.scrollLeft / (pageWidth + gap));
    setCurrentPage(Math.max(0, Math.min(idx, MOCK_FEED_CARD.length - 1)));
  };

  // @TODO 실시간 인기 게시글 API 연동

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Icon
          name="chat_conversation"
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
