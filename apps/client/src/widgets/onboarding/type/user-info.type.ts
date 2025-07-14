export interface DiseaseItem {
  diagnosedDisease: string;
  displayName: string;
  description: string | null;
}

export interface JobItem {
  job: string;
  displayName: string;
}

export interface CoverageItem {
  coveragePreference: string;
  description: string;
}
