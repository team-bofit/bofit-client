import { useMemo } from 'react';

import { components } from '@shared/types/schema';

interface useCoverageProps {
  sections?: components['schemas']['MajorDiseaseSubSection'][];
}

interface SectionCoverageProps {
  diagnosis: boolean;
  injury: boolean;
  both: boolean;
}

export const useCoverage = ({
  sections,
}: useCoverageProps): Record<string, SectionCoverageProps> => {
  const sectionZero = useMemo(() => {
    return sections?.reduce<Record<string, SectionCoverageProps>>(
      (acc, section) => {
        if (!section.displayName) {
          return acc;
        }
        const isDiagnosisZero = section?.diagnosis?.productCoverage === 0;
        const isInjuryZero = section?.injury?.productCoverage === 0;

        acc[section.displayName] = {
          diagnosis: isDiagnosisZero,
          injury: isInjuryZero,
          both: isDiagnosisZero && isInjuryZero,
        };

        return acc;
      },
      {},
    );
  }, [sections]);

  return sectionZero ?? {};
};
