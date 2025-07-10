import { createContext, useContext } from 'react';

interface useAccordionContextProps {
  expanded: boolean;
  handleClick: () => void;
}

export const AccordionContext = createContext<
  useAccordionContextProps | undefined
>(undefined);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      'Accordion 컴파운드 패턴은 반드시 <Accordion> 안에 존재해야 해요!',
    );
  }
  return context;
};
