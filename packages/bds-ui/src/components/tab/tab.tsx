import { PropsWithChildren } from 'react';

import { useTabContext } from './tab-provider';

import * as styles from './tab.css';

export default function Tab({ children }: PropsWithChildren) {
  return <nav className={styles.tabContainer}>{children}</nav>;
}

function List({ children }: PropsWithChildren) {
  return <ul className={styles.tabList}>{children}</ul>;
}

function Item({ value }: { value: string }) {
  const { selectedTab, setSelectedTab } = useTabContext();

  return (
    <li
      className={styles.tabItem({ selected: value === selectedTab })}
      onClick={() => setSelectedTab(value)}
    >
      {value}
      {value === selectedTab && <hr className={styles.tabLine} />}
    </li>
  );
}

function Panel({ children, tab }: PropsWithChildren<{ tab: string }>) {
  const { selectedTab } = useTabContext();
  const isActive = selectedTab === tab;

  return <>{isActive && children}</>;
}

Tab.List = List;
Tab.Item = Item;
Tab.Panel = Panel;
