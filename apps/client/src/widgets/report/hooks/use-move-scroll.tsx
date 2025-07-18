import { useEffect, useRef, useState } from 'react';

import { HOME_CATEGORY_TAB } from '../constant/tab-constant';

export const useMoveScroll = () => {
  const element = useRef<HTMLDivElement | null>(null);
  const onMoveToElement = () => {
    element.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  return { element, onMoveToElement };
};

interface ScrollRefs {
  majorDisease: {
    element: React.RefObject<HTMLElement | null>;
    onMoveToElement: () => void;
  };
  surgery: {
    element: React.RefObject<HTMLElement | null>;
    onMoveToElement: () => void;
  };
  hospitalization: {
    element: React.RefObject<HTMLElement | null>;
    onMoveToElement: () => void;
  };
  disability: {
    element: React.RefObject<HTMLElement | null>;
    onMoveToElement: () => void;
  };
  death: {
    element: React.RefObject<HTMLElement | null>;
    onMoveToElement: () => void;
  };
}

export const useActiveSection = (scrollRefs: ScrollRefs) => {
  const [currentCategory, setCurrentCategory] = useState<HOME_CATEGORY_TAB>(
    HOME_CATEGORY_TAB.MAJOR_DISEASE,
  );
  const isScrollingByClick = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (isScrollingByClick.current) {
        return;
      }

      const scrollY = window.scrollY;

      const getOffsetTop = (key: keyof ScrollRefs) =>
        scrollRefs[key].element.current?.offsetTop ?? 0;

      const offsetMap = {
        [HOME_CATEGORY_TAB.DEATH]: getOffsetTop('death'),
        [HOME_CATEGORY_TAB.DISABILITY]: getOffsetTop('disability'),
        [HOME_CATEGORY_TAB.HOSPITALIZATION]: getOffsetTop('hospitalization'),
        [HOME_CATEGORY_TAB.SURGERY]: getOffsetTop('surgery'),
        [HOME_CATEGORY_TAB.MAJOR_DISEASE]: getOffsetTop('majorDisease'),
      };

      if (scrollY >= offsetMap[HOME_CATEGORY_TAB.DEATH] - 100) {
        setCurrentCategory(HOME_CATEGORY_TAB.DEATH);
      } else if (scrollY >= offsetMap[HOME_CATEGORY_TAB.DISABILITY] - 100) {
        setCurrentCategory(HOME_CATEGORY_TAB.DISABILITY);
      } else if (
        scrollY >=
        offsetMap[HOME_CATEGORY_TAB.HOSPITALIZATION] - 100
      ) {
        setCurrentCategory(HOME_CATEGORY_TAB.HOSPITALIZATION);
      } else if (scrollY >= offsetMap[HOME_CATEGORY_TAB.SURGERY] - 100) {
        setCurrentCategory(HOME_CATEGORY_TAB.SURGERY);
      } else {
        setCurrentCategory(HOME_CATEGORY_TAB.MAJOR_DISEASE);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollRefs]);

  const handleCategoryClick = (category: HOME_CATEGORY_TAB) => {
    if (currentCategory === category) {
      return;
    }
    setCurrentCategory(category);
    isScrollingByClick.current = true;

    switch (category) {
      case HOME_CATEGORY_TAB.MAJOR_DISEASE:
        scrollRefs.majorDisease.onMoveToElement();
        break;
      case HOME_CATEGORY_TAB.SURGERY:
        scrollRefs.surgery.onMoveToElement();
        break;
      case HOME_CATEGORY_TAB.HOSPITALIZATION:
        scrollRefs.hospitalization.onMoveToElement();
        break;
      case HOME_CATEGORY_TAB.DISABILITY:
        scrollRefs.disability.onMoveToElement();
        break;
      case HOME_CATEGORY_TAB.DEATH:
        scrollRefs.death.onMoveToElement();
        break;
    }

    setTimeout(() => {
      isScrollingByClick.current = false;
    }, 500);
  };

  return { currentCategory, handleCategoryClick };
};
