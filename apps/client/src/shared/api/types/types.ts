import { paths } from '@shared/types/schema';

export type UserProfile =
  paths['/users/info']['get']['responses']['200']['content']['*/*'];

export type UserInfoJobs =
  paths['/user-infos/jobs']['get']['responses']['200']['content']['*/*'];

export type UserInfoJobList = NonNullable<UserInfoJobs['data']>['jobs'];

export type InsuranceReport =
  paths['/insurances/reports/{insurance-report-id}']['get']['responses']['200']['content']['*/*']['data'];

// COMMUNITY
export type FeedResponse =
  paths['/posts']['post']['responses']['200']['content'];

export type FeedRequest =
  paths['/posts']['post']['requestBody']['content']['application/json'];

export type FeedDetailResponse =
  paths['/posts/{post-id}']['get']['responses']['200']['content']['*/*']['data'];

export type FeedPreviewResponse =
  paths['/posts']['get']['responses']['200']['content']['*/*']['data'];
