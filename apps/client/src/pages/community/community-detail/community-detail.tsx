import { useState } from 'react';
import { useParams } from 'react-router';

import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import CommentBox from '@widgets/community/components/comment-box/comment-box';
import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';
import PostDetailInfo from '@widgets/community/components/post-detail-info/post-detail-info';
import UserComment from '@widgets/community/components/user-comment/user-comment';
import { EMPTY_POST } from '@widgets/community/constant/empty-content';
import { MOCK_COMMENT_LIST } from '@widgets/community/mocks/community-detail-comment-data';
import { MOCK_POST_DETAIL } from '@widgets/community/mocks/community-detail-data';

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

  const { postId } = useParams<{ postId: string }>();

  const { createdAt, nickname, title, content, commentCount } =
    MOCK_POST_DETAIL.data;

  const writerId = MOCK_POST_DETAIL.data.writerId;

  const isOwner = Number(postId) === writerId;

  return (
    <>
      <Navigation
        title="커뮤니티"
        rightIcon={<Icon name="home" width="4.8rem" height="4.8rem" />}
      />

      <article className={styles.container}>
        <PostDetailInfo
          nickname={nickname}
          createdAt={createdAt}
          profileImage={MOCK_POST_DETAIL.data.profileImage}
          isOwner={isOwner}
          title={title}
          content={content}
        />

        <article className={styles.commentMapContainer}>
          <div className={styles.commentInfo}>
            <Icon name="chat_square" width="2rem" height="2rem" />
            <p className={styles.commentNum}>댓글 {commentCount}</p>
          </div>

          <div className={styles.commentContainer}>
            {MOCK_COMMENT_LIST.data.content.length > 0 ? (
              MOCK_COMMENT_LIST.data.content.map(
                ({ commentId, nickname, content, createdAt, profileImage }) => (
                  <UserComment
                    key={commentId}
                    content={content}
                    writerNickName={nickname}
                    createdAt={createdAt}
                    profileImage={profileImage}
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
