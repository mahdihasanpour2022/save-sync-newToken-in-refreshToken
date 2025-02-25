/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import Acmp from "@/features/A/components/acmp";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiRoutes } from "@/features/e/constants/ApiRoutes";
import { cookies } from "next/headers";
import API from "@/utils/interceptor_server";
// import Cookies from "universal-cookie";

const getPodProfile = async () => {
  // console.log("ssr function runed");

  const cookieStore = await cookies(); // dont use universal in ssr
  const userDataCookie = cookieStore.get("userData");
  const { userLoginData } = userDataCookie
    ? JSON.parse(userDataCookie.value)
    : null;

  try {
    const { data, config } = await API.get(ApiRoutes.podProfile, {
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: { accessToken: `${userLoginData.accessToken}` },
    });
    console.log("data is ssr getPodProfile :", data);
    // console.log("response in getPodProfile :", config.headers["accessToken"]);

    return {...data, accessToken : config.headers["accessToken"]};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // console.log("error catcheddddddd :", error);
    if (error instanceof AxiosError) {
      console.log(`error in ssr :${error.response?.status}_${error.code}`);

      // console.log("errorrrrrrrrrrrrrrrrr :", error);
    }
    return null; // error null
  }
};

const Apage = async () => {
  // console.log("ssr 1000");
  const queryClient = new QueryClient();
  // ----------------------------------------- server side prefetch myBusiness

  await queryClient.prefetchQuery({
    queryKey: ["podProfile"],
    queryFn: getPodProfile,
  });

  // const cookie = new Cookies();
  // console.log(
  //   "*****************************************",
  //   cookie.get("userData")
  // );

  //  Error: Cookies can only be modified in a Server Action or Route Handler
  // const cookieStore = await cookies();
  // cookieStore.set({
  //   name: "a1n",
  //   value: "aliiiiii",
  //   path: "/",
  //   httpOnly: false,
  //   secure: false,
  //   sameSite: "lax",
  //   expires: Date.now() + 1000 * 60 * 60 * 24 * 1,
  // });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Acmp />
      </HydrationBoundary>
    </>
  );
};

export default Apage;
