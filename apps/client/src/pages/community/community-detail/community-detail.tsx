import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { Button, Modal, Navigation, useModal } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import CommentBox from '@widgets/community/components/comment-box/comment-box';
import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';
import PostDetailInfo from '@widgets/community/components/post-detail-info/post-detail-info';
import UserComment from '@widgets/community/components/user-comment/user-comment';
import { EMPTY_POST } from '@widgets/community/constant/empty-content';
import { MOCK_COMMENT_LIST } from '@widgets/community/mocks/community-detail-comment-data';
import { getTimeAgo } from '@widgets/community/utils/getTimeAgo';

import { POST_FEED_DETAIL_OPTIONS } from '@shared/api/domain/community/queries';
import Loading from '@shared/components/loading/loading';
import { useLimitedInput } from '@shared/hooks/use-limited-input';
import { routePath } from '@shared/router/path';

import * as styles from './community-detail.css';

const CommunityDetail = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const { postId } = useParams<{ postId: string }>();
  const { isErrorState } = useLimitedInput(30, value.length);
  const { openModal, closeModal } = useModal();

  if (!postId) {
    return <div>postId가 없습니다.</div>;
  }

  const { data, isLoading, isError } = useQuery(
    POST_FEED_DETAIL_OPTIONS.DETAIL(postId),
  );

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 30) {
      setValue(e.target.value);
    }
  };

  const currentId = 1; // api 연동 후 삭제

  const isPostOwner = Number(postId) === currentId;

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleOpenModal = () => {
    openModal(
      <Modal>
        <Modal.Title>이 댓글을 삭제할까요?</Modal.Title>
        <Modal.Content text="삭제한 댓글은 복원되지 않습니다." />
        <Modal.Actions>
          <Button onClick={handleClickDelete} variant="gray_fill">
            취소
          </Button>
          <Button variant="error" onClick={closeModal}>
            삭제
          </Button>
        </Modal.Actions>
      </Modal>,
    );
  };

  const handleClickDelete = () => {
    closeModal();
    // TODO: 실제 삭제 API 연동 or 상태 업데이트
  };

  return (
    <>
      <Navigation
        title="커뮤니티"
        rightIcon={
          <Icon name="home" onClick={() => handleNavigate(routePath.HOME)} />
        }
      />

      <article className={styles.container}>
        <PostDetailInfo
          nickname={data.writerNickname ?? ''}
          createdAt={getTimeAgo(data.createdAt ?? '')}
          profileImage={data.profileImage ?? ''}
          isOwner={isPostOwner}
          title={data.title ?? ''}
          content={data.content ?? ''}
        />

        <article className={styles.commentMapContainer}>
          <div className={styles.commentInfo}>
            <Icon name="chat_square" width="2rem" height="2rem" />
            <p className={styles.commentNum}>댓글 {data.commentCount}</p>
          </div>

          <div className={styles.commentContainer}>
            {MOCK_COMMENT_LIST.data.content.length > 0 ? (
              MOCK_COMMENT_LIST.data.content.map(
                ({
                  commentId,
                  writerId,
                  writerNickname,
                  content,
                  createdAt,
                  profileImage,
                }) => {
                  const isCommentOwner = writerId === currentId;

                  return (
                    <UserComment
                      key={commentId}
                      content={content}
                      writerNickName={writerNickname}
                      createdAt={createdAt}
                      profileImage={profileImage}
                      isCommentOwner={isCommentOwner}
                      onClickDelete={handleOpenModal}
                    />
                  );
                },
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
