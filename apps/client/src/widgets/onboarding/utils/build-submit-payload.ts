import { UserInfoSubmitRequest } from '@shared/api/types/types';

import { UserInfoStateProps } from '../type/user-info.type';

export const buildSubmitPayload = ({
  basicInfoState,
  healthFirstSelected,
  healthSecondSelected,
  coverageSelected,
  priceRange,
  userJobs,
  diagnosedDiseases,
  coverageItems,
}: {
  basicInfoState: UserInfoStateProps;
  healthFirstSelected: string[];
  healthSecondSelected: string[];
  coverageSelected: number[];
  priceRange: [number, number];
  userJobs: { job?: string; displayName?: string | null }[];
  diagnosedDiseases: {
    diagnosedDisease?: string;
    displayName?: string | null;
  }[];
  coverageItems: { coveragePreference?: string; description?: string | null }[];
}): UserInfoSubmitRequest => {
  const genderMap: Record<string, 'MALE' | 'FEMALE'> = {
    여성: 'FEMALE',
    남성: 'MALE',
  };

  const birthDate = `${basicInfoState.birthYear.padStart(4, '0')}-${basicInfoState.birthMonth.padStart(2, '0')}-${basicInfoState.birthDay.padStart(2, '0')}`;

  // 1. 직업명(한글) → job 코드 변환 (occupation은 한글명이라고 가정)
  // userJobs에서 displayName -> job 매핑 객체 생성
  const jobMap: Record<string, string> = {};
  userJobs.forEach(({ job, displayName }) => {
    if (job && typeof displayName === 'string') {
      jobMap[displayName] = job;
    }
  });
  const jobCode = jobMap[basicInfoState.occupation] ?? 'ETC';

  // 2. 질병명(한글) → diagnosedDisease 코드 변환
  // diagnosedDiseases에서 displayName -> diagnosedDisease 매핑 객체 생성
  const diseaseMap: Record<string, string> = {};
  diagnosedDiseases.forEach(({ diagnosedDisease, displayName }) => {
    if (diagnosedDisease && typeof displayName === 'string') {
      diseaseMap[displayName] = diagnosedDisease;
    }
  });

  // 3. 보장 우선순위 설정
  // coverageItems: { coveragePreference: string; description: string }[]
  // coverageSelected: number[] (인덱스)
  // 인덱스로 coveragePreference 키 뽑아서 순서대로 1,2,3...

  const coveragePreferences: Record<string, number> = {};
  coverageSelected.forEach((index, i) => {
    const key = coverageItems[index]?.coveragePreference;
    if (key) {
      coveragePreferences[key] = i + 1;
    }
  });

  // 4. 보험료 범위 10,000 단위 변환
  const minPremium = priceRange[0] * 10000;
  const maxPremium = priceRange[1] * 10000;

  return {
    name: basicInfoState.name,
    birthDate,
    gender: genderMap[basicInfoState.gender] || 'FEMALE',
    job: jobCode as UserInfoSubmitRequest['job'], // 타입 맞춤
    isMarried: basicInfoState.isMarried ?? false,
    hasChild: basicInfoState.hasChild ?? false,
    isDriver: basicInfoState.isDriver ?? false,
    diseaseHistory:
      healthFirstSelected as UserInfoSubmitRequest['diseaseHistory'],
    familyHistory:
      healthSecondSelected as UserInfoSubmitRequest['familyHistory'],
    coveragePreferences,
    minPremium,
    maxPremium,
  };
};
