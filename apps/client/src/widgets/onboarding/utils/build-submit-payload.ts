import { UserInfoSubmitRequest } from '@shared/api/types/types';

import { UserInfoStateProps } from '../type/user-info.type';
/**
 * 사용자 정보를 기반으로 API 제출용 페이로드를 생성합니다.
 *
 * @param basicInfoState 사용자 기본 정보 (이름, 생일, 성별 등)
 * @param healthFirstSelected 사용자의 개인 질병 이력 (질병 코드 배열)
 * @param healthSecondSelected 가족력 정보 (질병 코드 배열)
 * @param coverageSelected 사용자가 선택한 보장 항목의 인덱스 배열
 * @param priceRange 희망 보험료 범위 [최소, 최대] (단위: 만원)
 * @param userJobs 직업 목록 (job 코드 및 한글명 포함)
 * @param diagnosedDiseases 질병 목록 (질병 코드 및 한글명 포함)
 * @param coverageItems 보장 항목 목록
 * @returns API 전송용 UserInfoSubmitRequest 객체
 */
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
  /** 사용자의 성별 한글 → 영문 코드 매핑 */
  const genderMap: Record<string, 'MALE' | 'FEMALE'> = {
    여성: 'FEMALE',
    남성: 'MALE',
  };

  /** 생년월일을 'YYYY-MM-DD' 형식으로 조합 */
  const birthDate = `${basicInfoState.birthYear.padStart(4, '0')}-${basicInfoState.birthMonth.padStart(2, '0')}-${basicInfoState.birthDay.padStart(2, '0')}`;

  /**
   * 직업명(한글) → job 코드 변환 (occupation은 한글명이라고 가정)
   * userJobs에서 displayName -> job 매핑 객체 생성
   */
  const jobMap: Record<string, string> = {};
  userJobs.forEach(({ job, displayName }) => {
    if (job && typeof displayName === 'string') {
      jobMap[displayName] = job;
    }
  });
  const jobCode = jobMap[basicInfoState.occupation] ?? 'ETC';

  /**
   * 질병명(한글) → diagnosedDisease 코드 변환
   * diagnosedDiseases에서 displayName -> diagnosedDisease 매핑 객체 생성
   */
  const diseaseMap: Record<string, string> = {};
  diagnosedDiseases.forEach(({ diagnosedDisease, displayName }) => {
    if (diagnosedDisease && typeof displayName === 'string') {
      diseaseMap[displayName] = diagnosedDisease;
    }
  });

  /**
   * 보장 우선순위 설정
   * coverageItems: { coveragePreference: string; description: string }[]
   * coverageSelected: number[] (인덱스)
   * 인덱스로 coveragePreference 키 뽑아서 순서대로 1,2,3...
   */
  const coveragePreferences: Record<string, number> = {};
  coverageSelected.forEach((index, i) => {
    const key = coverageItems[index]?.coveragePreference;
    if (key) {
      coveragePreferences[key] = i + 1;
    }
  });

  /** 보험료 범위 10,000 단위 변환*/
  const minPremium = priceRange[0] * 10000;
  const maxPremium = priceRange[1] * 10000;

  return {
    name: basicInfoState.name,
    birthDate,
    gender: genderMap[basicInfoState.gender] || 'FEMALE',
    job: jobCode as UserInfoSubmitRequest['job'],
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
