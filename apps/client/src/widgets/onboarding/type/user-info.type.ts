import {
  UserInfoCoverages,
  UserInfoDiseases,
  UserInfoJobs,
} from '@shared/api/types/types';

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

export type UserInfoJobList = NonNullable<UserInfoJobs['data']>['jobs'];

export type UserInfoDiseaseList = NonNullable<
  UserInfoDiseases['data']
>['diagnosedDiseases'];

export type UserInfoCoverageList = NonNullable<
  UserInfoCoverages['data']
>['coveragePreferenceResponses'];
