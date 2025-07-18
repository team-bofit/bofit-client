import { useEffect } from 'react';
import { useTabContext } from 'node_modules/@bds/ui/src/components/tab/hooks/use-context';

import { HOME_CATEGORY_TAB } from '@widgets/report/constant/tab-constant';

import { SECTIONS } from '../constant/section-component-constant';

interface TabSyncProps {
  currentCategory: HOME_CATEGORY_TAB;
}

const TabSync = ({ currentCategory }: TabSyncProps) => {
  const { setSelectedTab } = useTabContext();

  useEffect(() => {
    const label = SECTIONS.find((s) => s.key === currentCategory)?.title;
    if (label) {
      setSelectedTab(label);
    }
  }, [currentCategory]);

  return null;
};

export default TabSync;
