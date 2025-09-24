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
