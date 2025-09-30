import { ReactNode } from 'react';

import { Icon } from '@bds/ui/icons';

import Chip from '@widgets/report/components/chip/chip.tsx';

import { StatusType } from '@shared/types/type';

import Title from '../title/title';
import { AccordionContextProvider } from './context-provider';
import { useAccordionContext } from './hooks/use-context';
import { useMeasureHeight } from './hooks/use-measure-height';

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

interface AccordionPanelStyle extends React.CSSProperties {
  '--accordion-height'?: string;
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
  const { ref, height } = useMeasureHeight<HTMLDivElement>();

  const ready = height > 0;
  const state: 'hidden' | 'open' | 'closed' = ready
    ? isOpen
      ? 'open'
      : 'closed'
    : 'hidden';

  const panelStyle: AccordionPanelStyle = {
    '--accordion-height': `${height}px`,
  };

  return (
    <div
      className={styles.panelAllContainer({ state })}
      style={panelStyle}
      aria-hidden={state !== 'open'}
    >
      <div ref={ref} className={styles.panelContainer}>
        {children}
      </div>
    </div>
  );
};

Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;
