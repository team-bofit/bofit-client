import { ReactNode } from 'react';
import { Icon } from '@bds/ui/icons';

import Chip from '../chip/chip';
import Title from '../title/title';
import { AccordionContextProvider } from './context-provider';
import { useAccordionContext } from './hooks/use-context';

import * as styles from './accordion.css';

interface accordionProps {
  children: ReactNode;
  defaultExpanded?: boolean;
}

interface accordionHeaderProps {
  children: string;
  type: '충분' | '강력' | '부족';
}

interface accordionPanelProps {
  children: ReactNode;
}

export const Accordion = ({
  children,
  defaultExpanded = false,
}: accordionProps) => {
  return (
    <AccordionContextProvider defaultExpanded={defaultExpanded}>
      <div className={styles.accordionContainer}>{children}</div>
    </AccordionContextProvider>
  );
};

export const AccordionHeader = ({ children, type }: accordionHeaderProps) => {
  const { expanded, handleClick } = useAccordionContext();

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContentsContainer}>
        <Title category="mainCategory" title={children} />
        <Chip type={type} />
      </div>
      <div className={styles.iconContainer} onClick={handleClick}>
        {expanded ? (
          <Icon name="caret_up_lg" size="2.4rem" color="gray800" />
        ) : (
          <Icon name="caret_down_lg" size="2.4rem" color="gray800" />
        )}
      </div>
    </div>
  );
};

export const AccordionPanel = ({ children }: accordionPanelProps) => {
  const { expanded } = useAccordionContext();
  return expanded && <>{children}</>;
};

Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;
