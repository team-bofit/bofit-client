export const keunbyeongData = {
  additional_info:
    '3대 중증질환(암, 뇌혈관, 심장)은 발병률이 높고, 치료비 부담도 커요. 진단 즉시 목돈(진단비)이 지급돼 경제적 부담을 줄여줘요.',
};

export const cancerData = {
  coverageStatus: '강력',
  additional_info:
    '일반암(위암, 폐암 등)과 소액암(갑상선암, 전립선암 등)으로 나뉘며, 치료비가 저렴하고 완치가 쉽기 때문에 보장금액이 낮게 설정돼요.',
  general: {
    diagnosis: {
      productCoverage: 1000,
      averageCoverage: 5000,
    },
    injury: {
      productCoverage: 7000,
      averageCoverage: 1000,
    },
  },
  atypical: {
    diagnosis: {
      productCoverage: 200,
      averageCoverage: 1000,
    },
    injury: {
      productCoverage: 2000,
      averageCoverage: 1000,
    },
  },
} as const;

export const noehyeolgwanData = {
  coverageStatus: '충분',
  additional_info:
    '뇌출혈→뇌경색→뇌혈관질환 순으로 보장 범위가 넓어져요. 범위가 넓을수록 더 다양한 질환을 보장받을 수 있어요.',
  hemorrhage: {
    diagnosis: {
      productCoverage: 2000,
      averageCoverage: 2000,
    },
    injury: {
      productCoverage: 0,
      averageCoverage: 1000,
    },
  },
  infarction: {
    diagnosis: {
      productCoverage: 0,
      averageCoverage: 2000,
    },
    injury: {
      productCoverage: 0,
      averageCoverage: 1000,
    },
  },
  other: {
    diagnosis: {
      productCoverage: 2000,
      averageCoverage: 2000,
    },
    injury: {
      productCoverage: 0,
      averageCoverage: 1000,
    },
  },
} as const;

export const shimjangData = {
  coverageStatus: '강력',
  additional_info:
    '심근경색보다 허혈성심장질환(협심증, 급성심근경색 포함)이 더 넓은 보장이에요. 확대심장질환과 심부전, 부정맥 특약도 고려해볼 수 있어요.',
  acuteMyocardialInfarction: {
    diagnosis: {
      productCoverage: 0,
      averageCoverage: 2000,
    },
    injury: {
      productCoverage: 2000,
      averageCoverage: 1000,
    },
  },
  ischemic: {
    diagnosis: {
      productCoverage: 1000,
      averageCoverage: 0,
    },
    injury: {
      productCoverage: 0,
      averageCoverage: 0,
    },
  },
  extended: {
    diagnosis: {
      productCoverage: 0,
      averageCoverage: 0,
    },
    injury: {
      productCoverage: 0,
      averageCoverage: 0,
    },
  },
  arrhythmia: {
    diagnosis: {
      productCoverage: 0,
      averageCoverage: 1000,
    },
    injury: {
      productCoverage: 0,
      averageCoverage: 2000,
    },
  },
} as const;
