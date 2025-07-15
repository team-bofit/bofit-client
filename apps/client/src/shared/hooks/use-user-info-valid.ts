import { UserInfoState } from '@widgets/onboarding/type/user-info.type';

export function useUserInfoValid(userInfo: UserInfoState): boolean {
  const { name, birthYear, birthMonth, birthDay, gender, occupation } =
    userInfo;

  const isFilled = (value: string) => value.trim() !== '';

  const validations = [
    isFilled(name),
    birthYear.trim().length === 4,
    isFilled(birthMonth),
    isFilled(birthDay),
    gender !== null,
    typeof occupation === 'string' && isFilled(occupation),
  ];

  return validations.every(Boolean);
}
