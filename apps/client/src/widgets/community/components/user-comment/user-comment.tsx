import { useState } from 'react';

import { TextButton } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import UserCommentInfo from '@widgets/community/components/user-comment-info/user-comment-info';
import UserCommentReply from '@widgets/community/components/user-comment-reply/user-comment-reply';
import { CommentType } from '@widgets/community/types/community-comment.type.ts';

import { Image } from '@shared/types/type.ts';
import { getTimeAgo } from '@shared/utils/get-time-ago';

import * as styles from './user-comment.css';

interface UserCommentProps {
  comment: CommentType;
  replyCount: number;
  images?: Image[];
}

const UserComment = ({ comment, replyCount, images }: UserCommentProps) => {
  const [isRotated, setIsRotated] = useState(false);

  const handleReplyButtonClick = () => {
    setIsRotated(!isRotated);
  };

  // @TODO: 대댓글 API 연동

  return (
    <>
      <div className={styles.container}>
        <div className={styles.userInfoContainer}>
          <UserCommentInfo comment={comment} images={images} />
          <p>
            <TextButton size="xs" color="black">
              답글 달기
            </TextButton>
          </p>
        </div>
        {replyCount > 0 && (
          <div className={styles.replyButtonContainer}>
            <button
              className={styles.replyContainer}
              onClick={handleReplyButtonClick}
            >
              <Icon
                name="caret_down_sm"
                width="2.4rem"
                height="2.4rem"
                color="gray800"
                className={styles.iconRotate({ rotated: isRotated })}
              />
              <p className={styles.reply}>
                답글 {replyCount}개 {isRotated ? '접기' : '보기'}
              </p>
            </button>
          </div>
        )}
      </div>
      {isRotated && (
        <>
          <UserCommentReply
            profileImage={''}
            writerNickName={'닉네임'}
            createdAt={getTimeAgo('2025-09-24T09:22:13+09:00')}
            content={'저도요 어쩌구...저쩌구'}
            images={[{ imageId: 1, imageUrl: 'https://placehold.co/600x400' }]}
          />
          <UserCommentReply
            profileImage={''}
            writerNickName={'닉네임'}
            createdAt={getTimeAgo('2025-09-24T09:22:13+09:00')}
            content={'저도요 어쩌구...저쩌구'}
            images={[{ imageId: 1, imageUrl: 'https://placehold.co/600x400' }]}
          />
        </>
      )}
    </>
  );
};

export default UserComment;
