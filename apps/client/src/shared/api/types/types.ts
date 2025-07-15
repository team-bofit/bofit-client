import { paths } from '@shared/types/schema';

export type UserProfile =
  paths['/users/info']['get']['responses']['200']['content']['*/*'];

export type UserInfoJobs =
  paths['/user-infos/jobs']['get']['responses']['200']['content']['*/*'];

export type UserInfoJobList = NonNullable<UserInfoJobs['data']>['jobs'];
