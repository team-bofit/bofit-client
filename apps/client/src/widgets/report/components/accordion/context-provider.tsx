import { ReactNode, useState } from 'react';

import { AccordionContext } from './hooks/use-context';

interface AccordionContextProviderProps {
  children: ReactNode;
  defaultExpanded: boolean;
}
export const AccordionContextProvider = ({
  children,
  defaultExpanded,
}: AccordionContextProviderProps) => {
  const [isOpen, setExpanded] = useState(defaultExpanded);

  const handleClick = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <AccordionContext.Provider value={{ isOpen, handleClick }}>
      {children}
    </AccordionContext.Provider>
  );
};
