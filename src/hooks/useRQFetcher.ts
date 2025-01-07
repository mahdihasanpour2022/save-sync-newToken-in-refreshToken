/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonRes } from "@/interfaces/commonRes";
import API from "@/utils/interceptor";
import {
  UseQueryResult,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosHeaders, Method, RawAxiosRequestHeaders } from "axios";

export const useRQFetcher = <TData, TError = CommonRes>({
  url,
  queryKey,
  headers = {},
  baseURL = undefined,
  params,
  pathParams = {},
  ...rest
}: // }: UseQueryOptions<TData, AxiosError<TError, any>> & {
UseQueryOptions<TData, TError> & {
  url: string;
  baseURL?: string;
  headers?:
    | (RawAxiosRequestHeaders &
        Partial<
          {
            [Key in Method as Lowercase<Key>]: AxiosHeaders;
          } & { common: AxiosHeaders }
        >)
    | AxiosHeaders;
  params?: { [key: string]: any };
  pathParams?: { [key: string]: any };
}) => {
  const queryFn = async () => {
    const { data } = await API.get(url, {
      baseURL,
      headers,
      // params: { page: 1, pageSize: 10 , ...params },
      // params: { page: 1,offset: 10 ,  ...params },
      params,
      pathParams,
    });
    return data;
  };

  // const queryRes: UseQueryResult<TData, AxiosError<TError, any>> = useQuery({
  const queryRes: UseQueryResult<TData, TError> = useQuery({
    queryKey,
    queryFn,
    ...rest,
  });

  return { ...queryRes };
};
