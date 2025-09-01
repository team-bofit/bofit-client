import { Content, Title } from '@bds/ui';

import UserDetailMeta from '@widgets/community/components/user-detail-meta/user-detail-meta';

import * as styles from './feed-detail-info.css';

interface FeedDetailInfoProps {
  nickname: string;
  createdAt: string;
  profileImage: string;
  isOwner: boolean;
  title: string;
  content: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export const FeedDetailInfo = ({
  nickname,
  createdAt,
  profileImage,
  isOwner,
  title,
  content,
  onEditClick,
  onDeleteClick,
}: FeedDetailInfoProps) => {
  return (
    <div className={styles.topContainer}>
      <UserDetailMeta
        nickName={nickname}
        createdAt={createdAt}
        profileImage={profileImage}
        isOwner={isOwner}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
      <div className={styles.postContentContainer}>
        <Title fontStyle="bd_md">{title}</Title>
        <Content text={content} length="lg" />
      </div>
    </div>
  );
};

export default FeedDetailInfo;
