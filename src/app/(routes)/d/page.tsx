"use server";
import Dcmp from "@/features/d/components/dcmp";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiRoutes } from "@/features/e/constants/ApiRoutes";
import { cookies } from "next/headers";
import API from "@/utils/interceptor_server";

const fetcherSsr = async (endpoint: string) => {
  console.log("fetch called ");
  const cookieStore = await cookies();
  const userDataCookie = cookieStore.get("userData");
  const { userLoginData } = userDataCookie
    ? JSON.parse(userDataCookie.value)
    : null;

  try {
    // حالت عادی بدون پاس دادم اکسس جدید از سمت سرور به کلاینت
    // const {data} = await API.get(endpoint, {
    //   baseURL: process.env.NEXT_PUBLIC_API_URL,
    //   headers: { accessToken: `${userLoginData.accessToken}` },
    // });
    // console.log("data is ssrFetcher :", data);
    // return data ;

    // اگر بخواهیم اکسس جدید را که پس از ارور 401 گرفته ایم به سمت کلاینت پاس دهیم تا در هوک فچر کلاینت ان را دریافت و در استیت قرار دهیم
    const data = await API.get(endpoint, {
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: { accessToken: `${userLoginData.accessToken}` },
    });
    // console.log("data is ssrFetcher :", data.data);
    console.log("data is ssrFetcher :", data.config.headers["accessToken"] );
    return {...data.data, accessToken : data.config.headers["accessToken"]};

    // return data.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof AxiosError) {
      console.log("error getPodProfile:", error);
    }
    return null; // error null
  }
};

const Dpage = async () => {
  const queryClient = new QueryClient();

  // await Promise.race([
  Promise.allSettled([
    await queryClient.prefetchQuery({
      queryKey: ["podProfile"],
      queryFn: () => fetcherSsr(`${ApiRoutes.podProfile}`),
    }),
    await queryClient.prefetchQuery({
      queryKey: ["favoritesProducts"],
      queryFn: () =>
        fetcherSsr(`${ApiRoutes.favoritesProducts}?offset=0&size=50`),
    }),
    await queryClient.prefetchQuery({
      queryKey: ["userAddresses"],
      queryFn: () => fetcherSsr(`${`${ApiRoutes.addresses}?offset=0&size=50`}`),
    }),
  ]);
  // ]);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Dcmp />
      </HydrationBoundary>
    </>
  );
};

export default Dpage;
