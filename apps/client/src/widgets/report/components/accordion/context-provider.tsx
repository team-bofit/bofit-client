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
  const [isOpen, setIsOpen] = useState(defaultExpanded);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <AccordionContext.Provider value={{ isOpen, handleClick }}>
      {children}
    </AccordionContext.Provider>
  );
};
