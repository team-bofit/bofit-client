import { Avatar, TextButton } from '@bds/ui';

import { Image } from '@shared/types/type.ts';

import * as styles from './user-comment-info.css';

const DELETE_CONTENT = '삭제';

interface UserCommentInfoProps {
  content?: string;
  writerNickName?: string;
  createdAt?: string;
  onClickDelete?: VoidFunction;
  profileImage?: string;
  isCommentOwner: boolean;
  imageUrl: Image[];
}

const UserCommentInfo = ({
  content,
  writerNickName,
  createdAt,
  onClickDelete,
  profileImage,
  isCommentOwner,
  imageUrl,
}: UserCommentInfoProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.commentContainer}>
        <div className={styles.userInfoContainer}>
          <div className={styles.userInfo}>
            <Avatar size="md" src={profileImage} />
            <div>
              <h2 className={styles.nickName}>{writerNickName}</h2>
              <p className={styles.timestamp}>{createdAt}</p>
            </div>
          </div>
          <div className={styles.button}>
            {isCommentOwner ? (
              <TextButton color="black" onClick={onClickDelete} size="sm">
                {DELETE_CONTENT}
              </TextButton>
            ) : (
              ''
            )}
          </div>
        </div>
        <p className={styles.comment}>{content}</p>
      </div>
      {imageUrl
        .filter((image) => image.imageUrl?.trim())
        .map((image) => (
          <div key={image.imageId} className={styles.imageContainer}>
            <img
              className={styles.postImage}
              src={image.imageUrl}
              alt="post image"
            />
          </div>
        ))}
    </div>
  );
};

export default UserCommentInfo;
