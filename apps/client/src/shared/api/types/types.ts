import { paths } from '@shared/types/schema';

/* =======================================================
 * 📌 USER 관련 타입
 * ======================================================= */

/**
 * @description 내 프로필 정보 조회 응답
 */
export type UserProfile =
  paths['/users/info']['get']['responses']['200']['content']['*/*'];

/**
 * @description 내 보험 요약 정보 응답
 */
export type ReportSummaryRes =
  paths['/users/me/report-summary']['get']['responses']['200']['content']['*/*'];

/**
 * @description 직업 정보 목록 응답
 */
export type UserInfoJobs =
  paths['/user-infos/jobs']['get']['responses']['200']['content']['*/*'];

/**
 * @description 진단받은 질병 정보 목록 응답
 */
export type UserInfoDiseases =
  paths['/user-infos/diagnosed-disease']['get']['responses']['200']['content']['*/*'];

/**
 * @description 선택된 보장 정보 목록 응답
 */
export type UserInfoCoverages =
  paths['/user-infos/coverage-select']['get']['responses']['200']['content']['*/*'];

/**
 * @description 보험 리포트 제출 요청 바디
 */
export type UserInfoSubmitRequest =
  paths['/insurances/reports']['post']['requestBody']['content']['application/json'];

/**
 * @description 보험 리포트 제출 성공 응답
 */
export type UserInfoSubmitResponse =
  paths['/insurances/reports']['post']['responses']['200']['content']['*/*'];

/* =======================================================
 * 📌 INSURANCE 관련 타입
 * ======================================================= */

/**
 * @description 특정 보험 리포트 상세 조회 응답
 */
export type InsuranceReport =
  paths['/insurances/reports/{insurance-report-id}']['get']['responses']['200']['content']['*/*'];

/**
 * @description 내 보험 요약 데이터 (ReportSummaryRes의 data 필드)
 */
export type InsuranceSummary =
  paths['/users/me/report-summary']['get']['responses']['200']['content']['*/*']['data'];

/**
 * @description 주요 질병 보장 리포트 응답
 */
export type InsuranceKeunbyeongReport =
  paths['/insurances/reports/{insurance-report-id}/major-disease']['get']['responses']['200']['content']['*/*'];

/**
 * @description 수술 보장 리포트 응답
 */
export type InsuranceSusulReport =
  paths['/insurances/reports/{insurance-report-id}/surgery']['get']['responses']['200']['content']['*/*'];

/**
 * @description 입원 보장 리포트 응답
 */
export type InsuranceIpwonReport =
  paths['/insurances/reports/{insurance-report-id}/hospitalization']['get']['responses']['200']['content']['*/*'];

/**
 * @description 장해(장애) 보장 리포트 응답
 */
export type InsuranceJanghaeReport =
  paths['/insurances/reports/{insurance-report-id}/disability']['get']['responses']['200']['content']['*/*'];

/**
 * @description 사망 보장 리포트 응답
 */
export type InsuranceSamangReport =
  paths['/insurances/reports/{insurance-report-id}/death']['get']['responses']['200']['content']['*/*'];

/* =======================================================
 * 📌 COMMUNITY 관련 타입
 * ======================================================= */

/**
 * @description 피드 작성 성공 응답
 */
export type FeedResponse =
  paths['/posts']['post']['responses']['200']['content'];

/**
 * @description 피드 작성 요청 바디
 */
export type FeedRequest =
  paths['/posts']['post']['requestBody']['content']['application/json'];

/**
 * @description 내 피드 목록 조회 응답
 */
export type MePostResponse =
  paths['/users/me/posts']['get']['responses']['200']['content']['*/*'];

/**
 * @description 내 피드 목록 조회 쿼리 파라미터
 */
export type MePostRequest =
  paths['/users/me/posts']['get']['parameters']['query'];

/**
 * @description 댓글 작성 성공 응답
 */
export type CommentPostResponse =
  paths['/posts/{post-id}/comments']['post']['responses']['200']['content'];

/**
 * @description 댓글 작성 요청 바디
 */
export type CommentPostRequest =
  paths['/posts/{post-id}/comments']['post']['requestBody']['content']['application/json'];

/**
 * @description 피드 상세 조회 응답
 */
export type FeedDetailResponse =
  paths['/posts/{post-id}']['get']['responses']['200']['content']['*/*']['data'];

/**
 * @description 피드 목록(프리뷰) 조회 응답
 */
export type FeedPreviewResponse =
  paths['/posts']['get']['responses']['200']['content']['*/*']['data'];

/**
 * @description 댓글 목록 조회 응답
 */
export type CommentResponse =
  paths['/posts/{post-id}/comments']['get']['responses']['200']['content']['*/*'];

/**
 * @description 댓글 목록 조회 쿼리 파라미터
 */
export type CommentRequest =
  paths['/posts/{post-id}/comments']['get']['parameters']['query'];

/**
 * @description 댓글 삭제 성공 응답
 */
export type CommentDeleteResponse =
  paths['/posts/{post-id}/comments/{comment-id}']['delete']['responses']['200']['content']['*/*'];

/**
 * @description 피드 수정 요청 경로 파라미터
 */
export type FeedUpdateResponse =
  paths['/posts/{post-id}']['put']['parameters']['path'];

/**
 * @description 피드 수정 요청 바디
 */
export type FeedUpdateRequestBody =
  paths['/posts/{post-id}']['put']['requestBody']['content']['application/json'];

/**
 * @description 피드 삭제 성공 응답
 */
export type FeedDeleteResponse =
  paths['/posts/{post-id}']['delete']['responses']['200']['content']['*/*'];
