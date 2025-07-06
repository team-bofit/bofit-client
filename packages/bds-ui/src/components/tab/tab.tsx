import { ReactNode } from 'react';

import { useTabContext } from './tab-provider';

import * as styles from './tab.css';

interface ContainerProps {
  children: ReactNode;
}

interface ListProps {
  children: ReactNode;
}

interface ItemProps {
  value: string;
}

interface PanelProps {
  children: ReactNode;
  tab: string;
}

const Container = ({ children }: ContainerProps) => {
  return <nav className={styles.tabContainer}>{children}</nav>;
};

const List = ({ children }: ListProps) => {
  return <ul className={styles.tabList}>{children}</ul>;
};

const Item = ({ value }: ItemProps) => {
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

const Panel = ({ children, tab }: PanelProps) => {
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
