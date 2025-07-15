import { paths } from '@shared/types/schema';

export type UserProfile =
  paths['/users/info']['get']['responses']['200']['content']['*/*'];

export type InsuranceReport =
  paths['/insurances/reports/{insurance-report-id}']['get']['responses']['200']['content']['*/*']['data'];
