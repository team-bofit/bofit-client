import { Icon } from '@bds/ui/icons';

import * as styles from './community-link.css';

const LINK_DESCRIPTION = {
  TITLE: '보험료, 남들은 얼마나 내는지\n궁금하지 않나요?',
  NAVIGATE: '커뮤니티로 이동하기',
};

interface CommunityLinkProps {
  onClick: VoidFunction;
}

const CommunityLink = ({ onClick }: CommunityLinkProps) => {
  return (
    <>
      <dl className={styles.linkContainer}>
        <dt className={styles.linkDescription}>{LINK_DESCRIPTION.TITLE}</dt>
        <div className={styles.navigateContainer} onClick={onClick}>
          <dd className={styles.navigateText}>{LINK_DESCRIPTION.NAVIGATE}</dd>
          <Icon name="caret_right_sm" color="primary900" />
        </div>
        <div className={styles.linkImage}>
          <img src="./glass_icon_document.webp" />
        </div>
      </dl>
    </>
  );
};

export default CommunityLink;
