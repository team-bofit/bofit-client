import { useState } from 'react';

import { TextButton } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import UserCommentInfo from '@widgets/community/components/user-comment-info/user-comment-info';
import { CommunityCommentType } from '@widgets/community/types/community-comment.type.ts';

import { Image } from '@shared/types/type.ts';

import * as styles from './user-comment.css';

interface UserCommentProps {
  comment: CommunityCommentType;
  replyCount: number;
  imageUrl: Image[];
}

const UserComment = ({ comment, replyCount, imageUrl }: UserCommentProps) => {
  const [isRotated, setIsRotated] = useState(false);

  const handleIconClick = () => {
    setIsRotated(!isRotated);
  };

  return (
    <div className={styles.container}>
      <div className={styles.userInfoContainer}>
        <UserCommentInfo comment={comment} imageUrl={imageUrl} />
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
