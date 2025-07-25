import { ReactNode } from 'react';

import { Icon } from '@bds/ui/icons';

import { StatusType } from '@shared/types/type';

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
  children?: string;
  accordionCategory?: string;
  onClick?: (category: string) => void;
  type?: StatusType;
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

export const AccordionHeader = ({
  children,
  type,
  accordionCategory,
  onClick,
}: accordionHeaderProps) => {
  const { expanded, handleClick } = useAccordionContext();

  const handleAccordionClick = () => {
    handleClick();
    if (accordionCategory) {
      onClick?.(accordionCategory);
    }
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
          rotate={expanded ? undefined : 180}
        />
      </div>
    </div>
  );
};

export const AccordionPanel = ({ children }: accordionPanelProps) => {
  const { expanded } = useAccordionContext();

  return <div className={styles.panelContainer({ expanded })}>{children}</div>;
};

Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;
