import Acmp from "@/features/A/components/acmp";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiRoutes } from "@/features/A/constants/ApiRoutes";
import { cookies } from "next/headers";
import API from "@/utils/interceptor";

const getPodProfile = async () => {
  const cookieStore = await cookies(); // dont use universal in ssr
  const { userLoginData } = JSON.parse(
    cookieStore.get("userData")?.value || "{}"
  );

  try {
    const { data } = await API.get(ApiRoutes.podProfile, {
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: { accessToken: `${userLoginData.accessToken}` },
    });
    console.log("data is carrrrrrrr :", data);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // console.log("error catcheddddddd :", error);
    if (error instanceof AxiosError) {
      console.log(`error in ssr :${error.response?.status}_${error.code}`);
    }
    return null; // error null
  }
};

const Apage = async () => {
  const queryClient = new QueryClient();
  // ----------------------------------------- server side prefetch myBusiness
  await queryClient.prefetchQuery({
    queryKey: ["podProfile"],
    queryFn: getPodProfile,
    retry: 1,
    staleTime: 10000,
    gcTime: 12000,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Acmp />
      </HydrationBoundary>
    </>
  );
};

export default Apage;
