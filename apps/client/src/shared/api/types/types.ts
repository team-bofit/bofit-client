import { paths } from '@shared/types/schema';

export type UserProfile =
  paths['/users/info']['get']['responses']['200']['content']['*/*'];

export type InsuranceKeunbyeongReport =
  paths['/insurances/reports/{insurance-report-id}/major-disease']['get']['responses']['200']['content']['*/*'];
