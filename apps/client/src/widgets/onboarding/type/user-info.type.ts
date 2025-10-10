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
  paymentPeriod?: '10' | '20' | '30' | undefined;
  maturityAge?: '80' | '90' | '100' | undefined;
}
