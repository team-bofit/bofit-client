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

export interface UserInfoState {
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: '남성' | '여성';
  occupation: string;
  isMarried: boolean | null;
  hasChild: boolean | null;
  isDriver: boolean | null;
}
