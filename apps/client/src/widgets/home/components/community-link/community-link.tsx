import { Icon } from '@bds/ui/icons';

import * as styles from './community-link.css.ts';

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
      <article className={styles.linkContainer} onClick={onClick}>
        <p className={styles.linkDescription}>{LINK_DESCRIPTION.TITLE}</p>
        <div className={styles.navigateContainer}>
          <p className={styles.navigateText}>{LINK_DESCRIPTION.NAVIGATE}</p>
          <Icon name="caret_right_sm" color="primary900" />
        </div>
        <div className={styles.linkImage}>
          <img src="./glass_icon_chat.webp" />
        </div>
      </article>
    </>
  );
};

export default CommunityLink;
