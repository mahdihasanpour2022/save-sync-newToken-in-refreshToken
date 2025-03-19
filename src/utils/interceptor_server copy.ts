import { ApiRoutes } from "@/config/apiRoutes";
// import { Config } from "@/config/config";
import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import qs from "qs";
import createAuthRefreshInterceptor from "axios-auth-refresh";
// import { userDataStore } from "@/stores/useUserDataStore";
import { cookies } from "next/headers";
// import Cookies from "universal-cookie";

// const isClient = typeof window !== "undefined";

const API: AxiosInstance = Axios.create({
  // baseURL: Config.APIURL,
  baseURL: "https://kidzyshop.podland.ir/shop/api",
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: "brackets" }), // indices: false  https://www.npmjs.com/package/qs
  },
});

// const isClient = !!(typeof window === undefined);

const requestHandler = async (
  request: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  // !!!request.headers["Accept"] && (request.headers["Accept"] = "application/json");
  // !!!request.headers["Content-Type"] && (request.headers["Content-Type"] = "application/json");

  console.log("interceptor_server req :", request.headers.accessToken);

  if (!!!request.headers["Accept"]) {
    request.headers["Accept"] = "application/json";
  }

  if (!!!request.headers["Content-Type"]) {
    request.headers["Content-Type"] = "application/json";
  }

  // ------------------------------------------------------------- csr :  add accessToken in req header with universal

  // const cookie = new Cookies(String(request.headers.cookie));
  // const user = cookie.get("userData");
  // console.log("252525 :", user?.userLoginData?.accessToken);

  // if (
  //   user &&
  //   user?.userLoginData?.accessToken &&
  //   !request.headers.accessToken
  // ) {
  //   console.log("33333 :", user?.userLoginData?.accessToken);
  //   request.headers.accessToken = `${user?.userLoginData?.accessToken}`;
  // }

  // ------------------------------------------------------------- csr :  add accessToken in req header with universal
  const cookieStore = await cookies();
  const userDataCookie = cookieStore.get("userData");
  const userCookie = userDataCookie ? JSON.parse(userDataCookie.value) : null;

  // const userDataCookieaLL = cookieStore.getAll();
  // console.log("userDataCookieaLL ==============>:", userDataCookieaLL);

  // console.log("6565655 :", userCookie.userLoginData?.accessToken, isClient);

  // fetch("http://localhost:3000/api/getCookie", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ cookieName: "myCookie" }), // ارسال نام کوکی به‌صورت داینامیک
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     if (data.error) {
  //       console.error(data.error);
  //     } else {
  //       console.log(`Cookie "${"myCookie"}" value:`, data.cookieValue);
  //     }
  //   })
  //   .catch((error) => console.error("Error retrieving cookie:", error));

  if (
    userCookie &&
    userCookie?.userLoginData?.accessToken &&
    !request.headers.accessToken
  ) {
    console.log("5555 :", userCookie.userLoginData?.accessToken);
    request.headers["accessToken"] = `${userCookie.userLoginData.accessToken}`;
  }

  // const cookieStore = await cookies(); // dont use universal in ssr
  // const { userLoginData } = JSON.parse(
  //   cookieStore.get("userData")?.value || "{}"
  // );

  // console.log("454545 :", userLoginData?.accessToken);
  // if (userLoginData && userLoginData?.accessToken) {
  //   console.log("4444 :", userLoginData?.accessToken);
  //   if (!request.headers.accessToken) {
  //     // if refreshAuthLogic set accessToken for failedRequest here cant change that accessToken
  //     request.headers.accessToken = `${userLoginData?.accessToken}`;
  //   }
  // }
  // console.log("request1 :", request);

  const URL = request.url || "";

  if (/\[[a-zA-Z]+\]/.test(URL) && request.pathParams) {
    const pathParams = request.pathParams;
    const paramNamesArr = Array.from(
      URL.matchAll(/\[([a-zA-Z]+)\]/g),
      (m) => m[0]
    );
    const reformedUrl = paramNamesArr.reduce((res, paramName) => {
      const reducedParam = paramName.slice(1, -1);
      return res?.replace(paramName, pathParams[reducedParam]);
    }, request.url);
    return { ...request, url: reformedUrl };
  }
  // console.log(
  //   "Updated request headers in finaaaaaaaaaaaaaaaal :",
  //   request.headers
  // );
  return request;
};

interface AxiosErrorProps extends AxiosError {
  config: AxiosError["config"] & {
    _retry: boolean;
  };
}

const errorHandler = (error: AxiosErrorProps) => {
  const originalRequest = error.config;
  console.log("error in ssr", error);

  if (error.code === "ERR_NETWORK")
    if (
      error?.response?.status === 500 &&
      originalRequest.url === ApiRoutes.refresh_token
    ) {
      // console.log(
      //   "vpn خود را قطع و از برقراری ارتباط اینترنت خود اطمینان حاصل نمایید."
      // );
      // ErrorToast({
      //   msg: "vpn خود را قطع و از برقراری ارتباط اینترنت خود اطمینان حاصل نمایید.",
      // });
      window.location.href = "/500";
    } else if (
      error?.response?.status === 502 ||
      error?.response?.status === 503
    ) {
      window.location.href = "/500";
    }
  // return Promise.reject(error?.response?.data); // اگر چیزی غیر از ارور کلی را ریترن کنید پکیج نصب کردی برای هندل کردن 401 نمیتواند تشخیص دهد 401 شده
  return Promise.reject(error);
};

const successHandler = (response: AxiosResponse): AxiosResponse => {
  // console.log("success >>>>>>>>>>>>>>>>>>>>>>>>>" , response.config.headers["accessToken"] )
  return response;
};

API.interceptors.request.use((request) => requestHandler(request));
API.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => successHandler(response),
  (error) => errorHandler(error)
);

const refreshAuthLogic = async (failedRequest: AxiosError) => {
  console.log("refresh runed ...", failedRequest.config.headers["accessToken"]);
  console.log(
    "API.defaults.headers.common.accessToken ...",
    API.defaults.headers.common["accessToken"]
  );

  const cookieStore = await cookies();
  const userDataCookie = cookieStore.get("userData");
  const { userLoginData } = userDataCookie
    ? JSON.parse(userDataCookie.value)
    : null;

  if (!userLoginData || !userLoginData.refreshToken) {
    return Promise.reject();
  }

  console.log(
    "userLoginData.accessToken ssr:",
    userLoginData.accessToken,
    failedRequest?.config?.url
  );

  // console.log(
  //   "serverSideAccessToken ***********************************************:",
  //   serverSideAccessToken,
  //   userLoginData.refreshToken,
  //   !!(
  //     serverSideAccessToken?.userRefreshToken &&
  //     serverSideAccessToken?.userRefreshToken !== userLoginData.refreshToken
  //   )
  // );

  if (
    !API.defaults.headers.common["accessToken"] ||
    +API.defaults.headers.common["expireTime"] < Date.now()
  ) {
    console.log("رفتیم واسه رفرش توکن  ...");
    return await fetch(`http://localhost:3000/api/refreshTokenSsr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: userLoginData.accessToken,
        refreshToken: userLoginData.refreshToken,
      }),
      credentials: "include",
    })
      .then((res) => {
        console.log("res :", res);
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("refresh token data >>>>>>>>>>>>>>>>>>>>>>>>>>>>", data);
        if (!data?.accessToken || !data?.refreshToken) {
          return;
        }

        API.defaults.headers.common["accessToken"] = `${data?.accessToken}`;
        API.defaults.headers.common["expireTime"] = `${
          Date.now() + 1000 * 60 * 14
        }`;

        // try {
        //   fetch("http://localhost:3000/api/setCookie", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       cookieName: "accessTokenCookie",
        //       cookieData: { accessToken: data.accessToken },
        //       options: {
        //         secure: false,
        //         httpOnly: false,
        //       },
        //     }),
        //     credentials: "include",
        //   })
        //     .then((response) => response.json())
        //     .then((data) => console.log("setting cookie: :", data))
        //     .catch((error) => console.error("Error setting cookie:", error));
        // } catch (error: any) {
        //   console.log("error in setcookie ssr :", error);
        // }

        if (failedRequest?.config?.headers) {
          failedRequest.config.headers["accessToken"] = `${data.accessToken}`;
          console.log(
            "failedRequest laaaaaaaaaaast :",
            failedRequest.config.url,
            data.accessToken
          );
          return Promise.resolve();
        }
      })
      .catch((error) => {
        console.error("Error fetching refresh-token API:", error);
        if (error?.response?.status === 400) {
          console.log(error);
        }
      });
  } else {
    if (failedRequest?.config?.headers) {
      failedRequest.config.headers[
        "accessToken"
      ] = `${API.defaults.headers.common["accessToken"]}`;
      console.log(
        "failedRequest laaaaaaaaaaast :",
        failedRequest.config.url,
        API.defaults.headers.common["accessToken"]
      );
      return Promise.resolve();
    }
  }
};

createAuthRefreshInterceptor(API, refreshAuthLogic, {
  statusCodes: [401], // اطمینان از تنظیم کد خطای 401
  pauseInstanceWhileRefreshing: true,
});

export default API;
