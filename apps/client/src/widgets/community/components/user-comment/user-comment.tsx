import { useState } from 'react';

import { TextButton } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import UserCommentInfo from '@widgets/community/components/user-comment-info/user-comment-info';

import { Image } from '@shared/types/type.ts';

import * as styles from './user-comment.css';

interface UserCommentProps {
  content?: string;
  writerNickName?: string;
  createdAt?: string;
  onClickDelete?: VoidFunction;
  profileImage?: string;
  isCommentOwner: boolean;
  replyCount: number;
  imageUrl: Image[];
}

const UserComment = ({
  content,
  writerNickName,
  createdAt,
  onClickDelete,
  profileImage,
  isCommentOwner,
  replyCount,
  imageUrl,
}: UserCommentProps) => {
  const [isRotated, setIsRotated] = useState(false);

  const handleIconClick = () => {
    setIsRotated(!isRotated);
  };
  return (
    <div className={styles.container}>
      <div className={styles.userInfoContainer}>
        <UserCommentInfo
          content={content}
          writerNickName={writerNickName}
          createdAt={createdAt}
          onClickDelete={onClickDelete}
          profileImage={profileImage}
          isCommentOwner={isCommentOwner}
          imageUrl={imageUrl}
        />
        <p>
          <TextButton size="sm" color="black">
            답글 달기
          </TextButton>
        </p>
      </div>
      {replyCount > 0 && (
        <button className={styles.replyContainer} onClick={handleIconClick}>
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
      )}
    </div>
  );
};

export default UserComment;
