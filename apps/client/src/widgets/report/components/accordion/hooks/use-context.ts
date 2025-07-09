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
      'Accordion compound components must be used within <Accordion>',
    );
  }
  return context;
};
