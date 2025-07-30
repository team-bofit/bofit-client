import { Alert } from '@bds/ui';

import { ACCORDION_CATEGORY } from '@widgets/report/constant/accordion-category-constant';
import { ALERT } from '@widgets/report/constant/alert-content';

import { InsuranceSusulReport } from '@shared/api/types/types';
import { StatusType } from '@shared/types/type';

import { Accordion } from '../../accordion/accordion';
import Class from '../../class/class';

interface SanghaeProps {
  onClick: (category: string) => void;
  data: InsuranceSusulReport['data'];
  target?: string;
  status?: StatusType;
}

const SanghaeClass = ({ target, status, onClick, data }: SanghaeProps) => {
  const surgeryList = Object.values(data?.surgeryType ?? {});

  const averageValues = surgeryList.map(
    (surgery) => surgery.averageCoverage ?? 0,
  );
  const guaranteeValues = surgeryList.map(
    (surgery) => surgery.productCoverage ?? 0,
  );

  const hasCoverage = guaranteeValues.every((value) => value === 0);
  const hasData = !!data;

  return (
    <div>
      <Accordion>
        <Accordion.Header
          type={status}
          onClick={onClick}
          accordionCategory={ACCORDION_CATEGORY.SUSUL.SANGHAE_CLASS}
        >
          {target}
        </Accordion.Header>
        <Accordion.Panel hasData={hasData}>
          {hasCoverage ? (
            <Alert
              type="additional"
              iconName="info_warning"
              iconSize="2rem"
              alertHeader={ALERT.HEADER}
              alertContents={ALERT.NEUN_CONTENTS}
              highlight={target}
            />
          ) : (
            <Class
              averageValues={averageValues}
              guaranteeValues={guaranteeValues}
            />
          )}
        </Accordion.Panel>
      </Accordion>
    </div>
  );
};

export default SanghaeClass;
