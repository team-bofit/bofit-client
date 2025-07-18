import { UserInfoStateProps } from '@widgets/onboarding/type/user-info.type';

const isValidName = (name: string) => {
  const trimmed = name.trim();
  const isCorrectLength = trimmed.length >= 2;
  return isCorrectLength;
};

const isValidBirth = (year: string, month: string, day: string) => {
  if (year.length !== 4) {
    return false;
  }

  const dateStr = `${year}-${month}-${day}`;
  const date = new Date(dateStr);
  const minDate = new Date('1900-01-01');
  const maxDate = new Date();

  return (
    !isNaN(date.getTime()) &&
    date >= minDate &&
    date <= maxDate &&
    date.getFullYear() === Number(year) &&
    date.getMonth() + 1 === Number(month) &&
    date.getDate() === Number(day)
  );
};

export function useUserInfoValid(userInfo: UserInfoStateProps): boolean {
  const { name, birthYear, birthMonth, birthDay, gender, occupation } =
    userInfo;

  const isOccupationValid =
    typeof occupation === 'string' && occupation.trim() !== '';

  const validations = [
    isValidName(name),
    isValidBirth(birthYear, birthMonth, birthDay),
    gender !== null,
    isOccupationValid,
  ];

  return validations.every(Boolean);
}
