import { paths } from '@shared/types/schema';

// USER
export type UserProfile =
  paths['/users/info']['get']['responses']['200']['content']['*/*'];

export type UserInfoJobs =
  paths['/user-infos/jobs']['get']['responses']['200']['content']['*/*'];

export type UserInfoDiseases =
  paths['/user-infos/diagnosed-disease']['get']['responses']['200']['content']['*/*'];

export type UserInfoCoverages =
  paths['/user-infos/coverage-select']['get']['responses']['200']['content']['*/*'];

// INSURANCE
export type InsuranceReport =
  paths['/insurances/reports/{insurance-report-id}']['get']['responses']['200']['content']['*/*']['data'];

export type InsuranceSummary =
  paths['/users/me/report-summary']['get']['responses']['200']['content']['*/*']['data'];

export type InsuranceKeunbyeongReport =
  paths['/insurances/reports/{insurance-report-id}/major-disease']['get']['responses']['200']['content']['*/*'];

// COMMUNITY
export type FeedResponse =
  paths['/posts']['post']['responses']['200']['content'];

export type FeedRequest =
  paths['/posts']['post']['requestBody']['content']['application/json'];

export type FeedPreviewResponse =
  paths['/posts']['get']['responses']['200']['content']['*/*']['data'];
