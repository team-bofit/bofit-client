import { useLayoutEffect, useRef, useState } from 'react';

export const useTabIndicator = (
  initialValue: string,
  onValueChange?: (value: string) => void,
) => {
  const [selectedTab, setSelectedTab] = useState(initialValue);
  const tabRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const [translateX, setTranslateX] = useState(0);

  useLayoutEffect(() => {
    const el = tabRefs.current[selectedTab];
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      const centerX = offsetLeft + offsetWidth / 2;
      const fixedWidth = 50;
      setTranslateX(centerX - fixedWidth / 2);
    }
  }, [selectedTab]);

  const setSelectedTabAndNotify = (value: string) => {
    setSelectedTab(value);
    onValueChange?.(value);
  };

  return {
    translateX,
    contextValue: {
      selectedTab,
      setSelectedTab: setSelectedTabAndNotify,
      tabRefs,
    },
  };
};
