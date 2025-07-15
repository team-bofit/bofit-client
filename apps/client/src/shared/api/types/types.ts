import { paths } from '@shared/types/schema';

// COMMUNITY
export type FeedResponse =
  paths['/posts']['post']['responses']['200']['content'];
export type FeedRequest =
  paths['/posts']['post']['requestBody']['content']['application/json'];
