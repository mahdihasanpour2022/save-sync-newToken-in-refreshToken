/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonRes } from "@/interfaces/commonRes";
import { userDataStore } from "@/stores/useUserDataStore";
import API from "@/utils/interceptor";

import {
  UseQueryResult,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosHeaders, Method, RawAxiosRequestHeaders } from "axios";

// interface WithAccessToken {
//   accessToken?: string;
// }

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

  // if (queryRes?.data?.["accessToken"]) {
  const { changeData, userLoginData } = userDataStore();

  // در کامپوننتی که سمت سرور داریم  پری فچ میکنیم از هدر ریسپانس اکسس جدید را برداشته و به سمت کلاینت پاس میدهیم تا اینجا استفاده کنیم برای اپدیت استیت و کوکی و لوکال با اکسس جدید
  //  در این مرحله چک میکنیم که اگر در ریسپانس کلید اکسس وجود داشت و همان اکسس موجود در استیت نبود (یعنی اکسس جدید است) پس ان را در استیت زاستند ذخیره میکنیم
  if (
    queryRes?.data?.["accessToken"] &&
    queryRes.data["accessToken"] !== userLoginData?.accessToken
  ) {
    console.log(">>>>>>>>>>>>>>>>> 1", queryRes.data["accessToken"]);
    console.log(">>>>>>>>>>>>>>>>> 2", userLoginData);

    changeData({
      accessToken: queryRes.data["accessToken"],
    });
  }
  return { ...queryRes };
};
