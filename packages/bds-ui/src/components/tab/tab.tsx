import { ReactNode } from 'react';

import { TabContext, useTabContext } from './hooks/use-context';
import { useTabIndicator } from './hooks/use-tab-indicator';

import * as styles from './tab.css';

interface ContainerProps {
  children: ReactNode;
  initialValue: string;
  backgroundColor: 'white' | 'white_bg';
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

const Container = ({
  children,
  initialValue,
  backgroundColor,
}: ContainerProps) => {
  const { contextValue, translateX } = useTabIndicator(initialValue);

  return (
    <TabContext.Provider value={contextValue}>
      <nav className={styles.tabContainer({ backgroundColor })}>
        {children}
        <hr
          className={styles.tabLine}
          style={{
            transform: `translateX(${translateX}px)`,
          }}
        />
      </nav>
    </TabContext.Provider>
  );
};

const List = ({ children }: ListProps) => {
  return <ul className={styles.tabList}>{children}</ul>;
};

const Item = ({ value }: ItemProps) => {
  const { selectedTab, setSelectedTab, tabRefs } = useTabContext();
  const isSelected = value === selectedTab;

  const handleClick = () => {
    setSelectedTab(value);
  };

  return (
    <li
      ref={(el) => {
        tabRefs.current[value] = el;
      }}
      className={styles.tabItem({ selected: isSelected })}
      onClick={handleClick}
    >
      <span>{value}</span>
    </li>
  );
};

const Panel = ({ children, tab }: PanelProps) => {
  const { selectedTab } = useTabContext();
  const isActive = selectedTab === tab;

  return <>{isActive && children}</>;
};

const Tab = {
  Container: Container,
  List: List,
  Item: Item,
  Panel: Panel,
};

export default Tab;
