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
