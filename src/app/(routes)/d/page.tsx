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
  const cookieStore = await cookies();
  const userDataCookie = cookieStore.get("userData");
  const { userLoginData } = userDataCookie
    ? JSON.parse(userDataCookie.value)
    : null;
  try {
    const { data } = await API.get(endpoint, {
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: { accessToken: `${userLoginData.accessToken}` },
    });
    console.log("data is carrrrrrrr :", data);

    return data;
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

  await Promise.race([
    Promise.allSettled([
      queryClient.prefetchQuery({
        queryKey: ["podProfile"],
        queryFn: () => fetcherSsr(`${ApiRoutes.podProfile}`),
      }),
      queryClient.prefetchQuery({
        queryKey: ["userAddresses"],
        queryFn: () =>
          fetcherSsr(`${`${ApiRoutes.addresses}?offset=1&size=10`}`),
      }),
      queryClient.prefetchQuery({
        queryKey: ["favoritesProducts"],
        queryFn: () =>
          fetcherSsr(`${ApiRoutes.favoritesProducts}?offset=1&size=10}`),
      }),
    ]),
  ]);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Dcmp />
      </HydrationBoundary>
    </>
  );
};

export default Dpage;
