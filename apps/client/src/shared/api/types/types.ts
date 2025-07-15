import { paths } from '@shared/types/schema';

export type UserProfile =
  paths['/users/info']['get']['responses']['200']['content']['*/*'];
