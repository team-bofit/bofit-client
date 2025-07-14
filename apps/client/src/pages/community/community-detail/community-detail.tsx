import { useState } from 'react';
import { Content, Navigation, Title } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import CommentBox from '@widgets/community/components/comment-box/comment-box';
import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';
import UserComment from '@widgets/community/components/user-comment/user-comment';
import UserDetailMeta from '@widgets/community/components/user-detail-meta/user-detail-meta';
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

  const {
    writerId,
    writerNickName,
    title,
    content,
    commentCount,
    createdAt,
    // updatedAt,
  } = COMMUNITY_DETAIL_DATA;

  return (
    <>
      <Navigation
        title="커뮤니티"
        rightIcon={<Icon name="home" width="4.8rem" height="4.8rem" />}
      />

      <article className={styles.container}>
        <article className={styles.topContainer}>
          <UserDetailMeta nickName={writerNickName} createdAt={createdAt} />
          <div className={styles.postContentContainer}>
            <Title fontStyle="bd_md">{title}</Title>
            <Content text={content} length="lg" />
          </div>
        </article>

        <article className={styles.commentMapContainer}>
          <div className={styles.commentInfo}>
            <Icon name="chat_square" width="2rem" height="2rem" />
            <p className={styles.commentNum}>댓글 {commentCount}</p>
          </div>
          <div className={styles.commentContainer}>
            {content.length > 0 ? (
              content.map(
                ({ writerId, content, writerNickName, createdAt }) => (
                  <UserComment
                    key={writerId}
                    content={content}
                    writerNickName={writerNickName}
                    createdAt={createdAt}
                    // TODO: onClickDelete={onClickDelete}
                  />
                ),
              )
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
