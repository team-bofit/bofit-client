import { PropsWithChildren } from 'react';

import { useTabContext } from './tab-provider';

import * as styles from './tab.css';

const Container = ({ children }: PropsWithChildren) => {
  return <nav className={styles.tabContainer}>{children}</nav>;
};

const List = ({ children }: PropsWithChildren) => {
  return <ul className={styles.tabList}>{children}</ul>;
};

const Item = ({ value }: { value: string }) => {
  const { selectedTab, setSelectedTab } = useTabContext();
  const isSelected = value === selectedTab;

  const handleClick = () => {
    setSelectedTab(value);
  };

  return (
    <li
      className={styles.tabItem({ selected: isSelected })}
      onClick={handleClick}
    >
      {value}
      {isSelected && <hr className={styles.tabLine} />}
    </li>
  );
};

const Panel = ({ children, tab }: PropsWithChildren<{ tab: string }>) => {
  const { selectedTab } = useTabContext();
  const isActive = selectedTab === tab;

  return <>{isActive && children}</>;
};

const Tab = {
  Container,
  List,
  Item,
  Panel,
};

export default Tab;
