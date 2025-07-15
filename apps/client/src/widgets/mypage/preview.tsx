import { Tab } from '@bds/ui';

import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';

import * as styles from './preview.css';

const Preview = () => {
  return (
    <section className={styles.previewContainer}>
      <div>
        <Tab.Container initialValue="내 글" backgroundColor="white">
          <Tab.List>
            <Tab.Item value="내 글" />
            <Tab.Item value="내 댓글" />
          </Tab.List>
        </Tab.Container>
      </div>
      <div className={styles.previewEmptyContainer}>
        <EmptyPlaceholder content="아직 작성한 글이 없어요" />
      </div>
      {/* <div className={styles.previewContent}></div> 
      @ TODO 댓글 및 글 조건부 렌더링*/}
    </section>
  );
};

export default Preview;
