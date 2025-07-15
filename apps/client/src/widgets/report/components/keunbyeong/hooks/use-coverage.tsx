import { useMemo } from 'react';

interface CoverageProps {
  displayName: string;
  diagnosis: {
    productCoverage: number;
  };
  injury: {
    productCoverage: number;
  };
}

interface SectionZeroProps {
  [sectionName: string]: {
    diagnosis: boolean;
    injury: boolean;
    both: boolean;
  };
}

export const useCoverage = (sections: CoverageProps[]): SectionZeroProps => {
  const sectionZero = useMemo(() => {
    return sections.reduce<SectionZeroProps>((acc, section) => {
      const isDiagnosisZero = section.diagnosis.productCoverage === 0;
      const isInjuryZero = section.injury.productCoverage === 0;

      acc[section.displayName] = {
        diagnosis: isDiagnosisZero,
        injury: isInjuryZero,
        both: isDiagnosisZero && isInjuryZero,
      };

      return acc;
    }, {});
  }, [sections]);

  return sectionZero;
};
