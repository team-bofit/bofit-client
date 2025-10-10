export interface UserInfoStateProps {
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: 'MALE' | 'FEMALE';
  occupation: string;
  isMarried: boolean | null;
  hasChild: boolean | null;
  isDriver: boolean | null;
}

export interface EtcInfoStateProps {
  renewableType?: 'RENEWABLE' | 'NON_RENEWABLE' | undefined;
  refundType?: 'PROTECTION_ONLY' | 'PARTIAL_RETURN' | 'FULL_RETURN' | undefined;
  paymentPeriod?: 'YEAR_10' | 'YEAR_20' | 'YEAR_30' | undefined;
  maturityAge?: 'OLD_80' | 'OLD_90' | 'OLD_100' | undefined;
}
