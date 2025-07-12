import { useState } from 'react';
import { Avatar, Content, Navigation, TextButton, Title } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import CommentBox from '@widgets/community/components/comment-box/comment-box';
import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';
import UserComment from '@widgets/community/components/user-comment/user-comment';
import { EMPTY_POST } from '@widgets/community/constant/empty-content';
import { COMMUNITY_DETAIL_DATA } from '@widgets/community/mocks/community-detail-data';

import { useLimitedInput } from '@shared/hooks/use-limited-input';

import * as styles from './community-detail.css';

const CommunityDetail = () => {
  const [value, setValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 30) {
      setValue(e.target.value);
    }
  };
  const { isErrorState } = useLimitedInput(30, value.length);

  const { title, content, nickName, timestamp, comments } =
    COMMUNITY_DETAIL_DATA;

  return (
    <>
      <Navigation
        title="커뮤니티"
        rightIcon={<Icon name="home" width="4.8rem" height="4.8rem" />}
      />

      <article className={styles.container}>
        <article className={styles.topContainer}>
          <div className={styles.userMetaContainer}>
            <div className={styles.userMeta}>
              <Avatar size="md" />
              <div>
                <h2 className={styles.nickName}>{nickName}</h2>
                <p className={styles.timestamp}>{timestamp}시간 전</p>
              </div>
            </div>
            <div className={styles.button}>
              <TextButton color="primary" style={{ padding: '0.6rem 0.8rem' }}>
                수정
              </TextButton>
              <TextButton color="black" style={{ padding: '0.6rem 0.8rem' }}>
                삭제
              </TextButton>
            </div>
          </div>
          <div className={styles.postContentContainer}>
            <Title fontStyle="bd_md">{title}</Title>
            <Content text={content} length="lg" />
          </div>
        </article>
        <article className={styles.bottomContainer}>
          <div className={styles.commentInfo}>
            <Icon name="chat_square" width="2rem" height="2rem" />
            <p className={styles.commentNum}>댓글 {comments.length}</p>
          </div>
          <div className={styles.commentContainer}>
            {comments.length > 0 ? (
              comments.map(({ id, comment, nickName, timestamp }) => (
                <UserComment
                  key={id}
                  comment={comment}
                  nickName={nickName}
                  timestamp={timestamp}
                  //   onClickDelete={onClickDelete}
                />
              ))
            ) : (
              <div className={styles.emptyPlaceholder}>
                <EmptyPlaceholder content={EMPTY_POST} />
              </div>
            )}
          </div>
        </article>
      </article>
      <CommentBox
        value={value}
        onChange={handleChange}
        errorState={isErrorState}
      />
    </>
  );
};

export default CommunityDetail;
