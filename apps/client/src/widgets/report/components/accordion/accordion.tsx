import { ReactNode } from 'react';

import { Icon } from '@bds/ui/icons';

import { StatusType } from '@shared/types/type';

import Chip from '../chip/chip';
import Title from '../title/title';
import { AccordionContextProvider } from './context-provider';
import { useAccordionHeight } from './hooks/use-accordion-height';
import { useAccordionContext } from './hooks/use-context';

import * as styles from './accordion.css';

interface accordionProps {
  children: ReactNode;
  defaultExpanded?: boolean;
}

interface accordionHeaderProps {
  children?: string;
  accordionCategory?: string;
  onClick?: (category: string) => void;
  type?: StatusType;
}

interface accordionPanelProps {
  children: ReactNode;
}

export const Accordion = ({ children }: accordionProps) => {
  const defaultExpanded = false;

  return (
    <AccordionContextProvider defaultExpanded={defaultExpanded}>
      <div className={styles.accordionContainer}>{children}</div>
    </AccordionContextProvider>
  );
};

export const AccordionHeader = ({
  children,
  type,
  accordionCategory,
  onClick,
}: accordionHeaderProps) => {
  const { isOpen, handleClick } = useAccordionContext();

  const handleAccordionClick = () => {
    if (accordionCategory) {
      onClick?.(accordionCategory);
    }
    handleClick();
  };
  return (
    <div className={styles.headerContainer} onClick={handleAccordionClick}>
      <div className={styles.headerContentsContainer}>
        <Title category="mainCategory" title={children} />
        <Chip type={type} />
      </div>
      <div className={styles.iconContainer}>
        <Icon
          className={styles.icon}
          name="caret_up_lg"
          size="2.4rem"
          color="gray800"
          rotate={isOpen ? undefined : 180}
        />
      </div>
    </div>
  );
};

export const AccordionPanel = ({ children }: accordionPanelProps) => {
  const { isOpen } = useAccordionContext();
  const { contentRef } = useAccordionHeight<HTMLDivElement>(isOpen, 200);

  return (
    <div className={styles.panelAllContainer({ isOpen })}>
      <div ref={contentRef} className={styles.panelContainer}>
        {children}
      </div>
    </div>
  );
};

Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;
