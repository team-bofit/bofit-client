export const MOCK_DISEASES = [
  {
    diagnosedDisease: 'CANCER',
    displayName: '암',
    description: null,
  },
  {
    diagnosedDisease: 'CEREBROVASCULAR',
    displayName: '뇌혈관질환',
    description: '뇌출혈, 뇌경색',
  },
  {
    diagnosedDisease: 'HEART',
    displayName: '심장질환',
    description: null,
  },
  {
    diagnosedDisease: 'RESPIRATORY',
    displayName: '호흡기질환',
    description: null,
  },
  {
    diagnosedDisease: 'RIVER',
    displayName: '간질환',
    description: null,
  },
  {
    diagnosedDisease: 'KIDNEY',
    displayName: '신장질환',
    description: null,
  },
  {
    diagnosedDisease: 'MENTAL',
    displayName: '정신질환',
    description: null,
  },
  {
    diagnosedDisease: 'CHRONIC',
    displayName: '만성질환',
    description: '고혈압, 당뇨 등',
  },
  {
    diagnosedDisease: 'NONE',
    displayName: '해당 없음',
    description: null,
  },
];

export const MOCK_JOBS = [
  {
    job: 'OFFICE_WORK',
    displayName: '사무직',
  },
  {
    job: 'SERVICE_SALES',
    displayName: '서비스·영업직',
  },
  {
    job: 'PROFESSIONAL',
    displayName: '전문직',
  },
  {
    job: 'SELF_EMPLOYED',
    displayName: '자영업',
  },
  {
    job: 'PRODUCTION_SITE',
    displayName: '생산·현장직',
  },
  {
    job: 'DRIVER_DELIVERY',
    displayName: '운전·배달직',
  },
  {
    job: 'HOMEMAKER',
    displayName: '주부',
  },
  {
    job: 'STUDENT',
    displayName: '학생',
  },
  {
    job: 'UNEMPLOYED',
    displayName: '무직',
  },
  {
    job: 'FREELANCER',
    displayName: '프리랜서',
  },
  {
    job: 'ETC',
    displayName: '기타',
  },
];

export const MOCK_COVERAGE = [
  {
    coveragePreference: 'MAJOR_DISEASE',
    description: '암, 심장질환같은 큰 병에 대비하고 싶어요',
  },
  {
    coveragePreference: 'DEATH_BENEFIT',
    description: '사망 시 가족에게 경제적 도움이 되는 보장을 원해요',
  },
  {
    coveragePreference: 'ESSENTIAL_ONLY',
    description: '합리적인 보험료로 꼭 필요한 보장만 챙기고 싶어요',
  },
  {
    coveragePreference: 'ACCIDENT_PREDICTION',
    description: '예기치 않은 사고에 대비하고 싶어요',
  },
  {
    coveragePreference: 'SURGERY_COVERAGE',
    description: '수술할 일이 생겼을 때 보장받고 싶어요',
  },
  {
    coveragePreference: 'MAXIMUM_COVERAGE',
    description: '가격이 좀 높아도 폭넓은 보장을 받고 싶어요',
  },
  {
    coveragePreference: 'RECOMMENDED_OPTION',
    description: '잘 모르겠어요. 많이 선택하는 걸로 설정할래요',
  },
];

export const MOCK_USER = {
  userId: 1,
  nickname: '장정훈',
  profileImageUrl: 'string',
  isRecommendInsurance: true,
};
