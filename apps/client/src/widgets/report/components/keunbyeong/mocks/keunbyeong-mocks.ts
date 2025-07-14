export const cancerData = {
  displayName: '암',
  additionalInfo:
    '일반암(위암, 폐암 등)과 소액암(갑상선암, 전립선암 등)으로 나뉘며, 치료비가 저렴하고 완치가 쉽기 때문에 보장금액이 낮게 설정돼요.',
  sections: [
    {
      displayName: '일반암',
      diagnosis: {
        productCoverage: 3000,
        averageCoverage: 5000,
      },
      injury: {
        productCoverage: 2000,
        averageCoverage: 1000,
      },
    },
    {
      displayName: '소액암',
      diagnosis: {
        productCoverage: 200,
        averageCoverage: 1000,
      },
      injury: {
        productCoverage: 1000,
        averageCoverage: 1000,
      },
    },
  ],
};

export const noehyeolgwanData = {
  displayName: '뇌혈관질환',
  additionalInfo:
    '뇌출혈→뇌경색→뇌혈관질환 순으로 보장 범위가 넓어져요. 범위가 넓을수록 더 다양한 질환을 보장받을 수 있어요.',
  sections: [
    {
      displayName: '뇌출혈',
      diagnosis: {
        productCoverage: 0,
        averageCoverage: 2000,
      },
      injury: {
        productCoverage: 0,
        averageCoverage: 1000,
      },
    },
    {
      displayName: '뇌졸중',
      diagnosis: {
        productCoverage: 0,
        averageCoverage: 2000,
      },
      injury: {
        productCoverage: 3000,
        averageCoverage: 1000,
      },
    },
    {
      displayName: '기타 뇌혈관질환',
      diagnosis: {
        productCoverage: 2000,
        averageCoverage: 2000,
      },
      injury: {
        productCoverage: 0,
        averageCoverage: 1000,
      },
    },
  ],
};

export const shimjangData = {
  displayName: '심장질환',
  additionalInfo:
    '심근경색보다 허혈성심장질환(협심증, 급성심근경색 포함)이 더 넓은 보장이에요. 확대심장질환과 심부전, 부정맥 특약도 고려해볼 수 있어요.',
  sections: [
    {
      displayName: '급성 심근경색',
      diagnosis: {
        productCoverage: 0,
        averageCoverage: 2000,
      },
      injury: {
        productCoverage: 2000,
        averageCoverage: 1000,
      },
    },
    {
      displayName: '허혈성 심장질환',
      diagnosis: {
        productCoverage: 1000,
        averageCoverage: 0,
      },
      injury: {
        productCoverage: 0,
        averageCoverage: 0,
      },
    },
    {
      displayName: '확대 심장질환',
      diagnosis: {
        productCoverage: 0,
        averageCoverage: 0,
      },
      injury: {
        productCoverage: 0,
        averageCoverage: 0,
      },
    },
    {
      displayName: '부정맥, 심부전',
      diagnosis: {
        productCoverage: 0,
        averageCoverage: 0,
      },
      injury: {
        productCoverage: 0,
        averageCoverage: 0,
      },
    },
  ],
};
