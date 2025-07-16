import { queryOptions } from '@tanstack/react-query';

import { END_POINT } from '@shared/api/config/end-point';
import { api } from '@shared/api/config/instance';
import { USER_QUERY_KEY } from '@shared/api/keys/query-key';
import {
  UserInfoCoverages,
  UserInfoDiseases,
  UserInfoJobs,
  UserProfile,
} from '@shared/api/types/types';

export const USER_QUERY_OPTIONS = {
  PROFILE: () => {
    return queryOptions({
      queryKey: USER_QUERY_KEY.PROFILE(),
      queryFn: getUserProfile,
    });
  },
  JOBS: () => {
    return queryOptions({
      queryKey: USER_QUERY_KEY.JOBS(),
      queryFn: getUserInfoJobs,
    });
  },
  DISEASES: () => {
    return queryOptions({
      queryKey: USER_QUERY_KEY.DISEASES(),
      queryFn: getUserInfoDiseases,
    });
  },
  COVERAGES: () => {
    return queryOptions({
      queryKey: USER_QUERY_KEY.COVERAGES(),
      queryFn: getUserInfoCoverages,
    });
  },
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const response = await api
    .get(END_POINT.USER.GET_USER_INFO)
    .json<UserProfile>();
  return response;
};

export const getUserInfoJobs = async (): Promise<UserInfoJobs | null> => {
  const response = await api
    .get(END_POINT.USER.GET_USER_INFO_JOBS)
    .json<UserInfoJobs>();
  return response;
};

export const getUserInfoDiseases =
  async (): Promise<UserInfoDiseases | null> => {
    const response = await api
      .get(END_POINT.USER.GET_USER_INFO_DISEASES)
      .json<UserInfoDiseases>();
    return response;
  };

export const getUserInfoCoverages =
  async (): Promise<UserInfoCoverages | null> => {
    const response = await api
      .get(END_POINT.USER.GET_USER_INFO_COVERAGES)
      .json<UserInfoCoverages>();
    return response;
  };
