export interface DiseaseItemProps {
  diagnosedDisease: string;
  displayName: string;
  description: string | null;
}

export interface JobResponseProps {
  job?: string;
  displayName?: string;
}

export interface CoverageItemProps {
  coveragePreference: string;
  description: string;
}

export interface UserInfoStateProps {
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
