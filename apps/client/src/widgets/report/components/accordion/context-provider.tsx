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
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleClick = () => {
    setExpanded((prev) => !prev);
  };
  return (
    <AccordionContext.Provider value={{ expanded, handleClick }}>
      {children}
    </AccordionContext.Provider>
  );
};
