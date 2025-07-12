export interface CoverageItemProps {
  productCoverage: number;
  averageCoverage: number;
}

export interface CoverageGroupProps {
  diagnosis: CoverageItemProps;
  injury: CoverageItemProps;
}

export interface CancerDataProps {
  coverageStatus: '강력' | '충분' | '부족';
  additional_info: string;
  general: CoverageGroupProps;
  atypical: CoverageGroupProps;
}

export interface NoehyeolgwanDataProps {
  coverageStatus: '강력' | '충분' | '부족';
  additional_info: string;
  hemorrhage: CoverageGroupProps;
  infarction: CoverageGroupProps;
  other: CoverageGroupProps;
}

export interface ShimjangDataProps {
  coverageStatus: '강력' | '충분' | '부족';
  additional_info: string;
  acuteMyocardialInfarction: CoverageGroupProps;
  ischemic: CoverageGroupProps;
  extended: CoverageGroupProps;
  arrhythmia: CoverageGroupProps;
}
