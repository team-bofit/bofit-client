import { Avatar, TextButton } from '@bds/ui';

import { CommunityCommentType } from '@widgets/community/types/community-comment.type.ts';

import { Image } from '@shared/types/type.ts';

import * as styles from './user-comment-info.css';

const DELETE_CONTENT = '삭제';

interface UserCommentInfoProps {
  comment: CommunityCommentType;
  imageUrl: Image[];
}

const UserCommentInfo = ({ comment, imageUrl }: UserCommentInfoProps) => {
  const {
    content,
    writerNickName,
    createdAt,
    profileImage,
    isCommentOwner,
    onClickDelete,
  } = comment;

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
        .filter(({ imageUrl }) => imageUrl?.trim())
        .map(({ imageId, imageUrl }) => (
          <div key={imageId} className={styles.imageContainer}>
            <img className={styles.postImage} src={imageUrl} alt="post image" />
          </div>
        ))}
    </div>
  );
};

export default UserCommentInfo;
