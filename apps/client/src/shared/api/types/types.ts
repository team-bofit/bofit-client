import { paths } from '@shared/types/schema';

// USER
export type UserProfile =
  paths['/users/info']['get']['responses']['200']['content']['*/*'];

export type ReportSummaryRes =
  paths['/users/me/report-summary']['get']['responses']['200']['content']['*/*'];

export type UserInfoJobs =
  paths['/user-infos/jobs']['get']['responses']['200']['content']['*/*'];

export type UserInfoDiseases =
  paths['/user-infos/diagnosed-disease']['get']['responses']['200']['content']['*/*'];

export type UserInfoCoverages =
  paths['/user-infos/coverage-select']['get']['responses']['200']['content']['*/*'];

export type UserInfoSubmitRequest =
  paths['/insurances/reports']['post']['requestBody']['content']['application/json'];

export type UserInfoSubmitResponse =
  paths['/insurances/reports']['post']['responses']['200']['content']['*/*'];

// INSURANCE
export type InsuranceReport =
  paths['/insurances/reports/{insurance-report-id}']['get']['responses']['200']['content']['*/*'];

export type InsuranceSummary =
  paths['/users/me/report-summary']['get']['responses']['200']['content']['*/*']['data'];

export type InsuranceKeunbyeongReport =
  paths['/insurances/reports/{insurance-report-id}/major-disease']['get']['responses']['200']['content']['*/*'];

// COMMUNITY
export type FeedResponse =
  paths['/posts']['post']['responses']['200']['content'];

export type FeedRequest =
  paths['/posts']['post']['requestBody']['content']['application/json'];

// --- me post
export type MePostResponse =
  paths['/users/me/posts']['get']['responses']['200']['content']['*/*'];
export type MePostRequest =
  paths['/users/me/posts']['get']['parameters']['query'];

export type CommentPostResponse =
  paths['/posts/{post-id}/comments']['post']['responses']['200']['content'];

export type CommentPostRequest =
  paths['/posts/{post-id}/comments']['post']['requestBody']['content']['application/json'];

export type FeedDetailResponse =
  paths['/posts/{post-id}']['get']['responses']['200']['content']['*/*']['data'];

export type FeedPreviewResponse =
  paths['/posts']['get']['responses']['200']['content']['*/*']['data'];

export type CommentResponse =
  paths['/posts/{post-id}/comments']['get']['responses']['200']['content']['*/*'];

export type CommentRequest =
  paths['/posts/{post-id}/comments']['get']['parameters']['query'];

export type FeedUpdateResponse =
  paths['/posts/{post-id}']['put']['parameters']['path'];

export type FeedUpdateRequestBody =
  paths['/posts/{post-id}']['put']['requestBody']['content']['application/json'];
