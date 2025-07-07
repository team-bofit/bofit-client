import { useLayoutEffect, useRef, useState } from 'react';

export const useTabIndicator = (initialValue: string) => {
  const [selectedTab, setSelectedTab] = useState(initialValue);
  const tabRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const [translateX, setTranslateX] = useState(0);

  useLayoutEffect(() => {
    const el = tabRefs.current[selectedTab];
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      // 탭 가운데 정렬을 위한 계산
      const centerX = offsetLeft + offsetWidth / 2;
      const fixedWidth = 50;
      setTranslateX(centerX - fixedWidth / 2);
    }
  }, [selectedTab]);

  return {
    translateX,
    contextValue: { selectedTab, setSelectedTab, tabRefs },
  };
};
