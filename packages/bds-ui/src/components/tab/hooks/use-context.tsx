import { createContext, useContext } from 'react';

interface TabContextProps {
  selectedTab: string;
  setSelectedTab: (value: string) => void;
}
export const TabContext = createContext<TabContextProps | null>(null);

export const useTabContext = () => {
  const tabContext = useContext(TabContext);

  if (!tabContext) {
    throw new Error('부모 트리에서 TabContext를 사용해주세요.');
  }

  return tabContext;
};
