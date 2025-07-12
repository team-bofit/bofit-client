import { Tab } from '@bds/ui';
import * as styles from './preview.css';
import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';

const Preview = () => {
  return (
    <section className={styles.previewContainer}>
      <Tab.Container initialValue="내 글">
        <Tab.List>
          <Tab.Item value="내 글" />
          <Tab.Item value="내 댓글" />
        </Tab.List>
      </Tab.Container>
      <div className={styles.previewContent}>
        <EmptyPlaceholder content={'아직 작성한 글이 없어요.'} />
      </div>
    </section>
  );
};

export default Preview;
