import { ApiRoutes } from "@/config/apiRoutes";
// import { Config } from "@/config/config";
import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import qs from "qs";
import Cookies from "universal-cookie";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { userDataStore } from "@/stores/useUserDataStore";

const API: AxiosInstance = Axios.create({
  // baseURL: Config.APIURL,
  baseURL: "https://kidzyshop.podland.ir/shop/api",
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: "brackets" }), // indices: false  https://www.npmjs.com/package/qs
  },
});

const requestHandler = async (
  request: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  console.log("requestttttttttttt :", request.headers.accessToken);

  if (!!!request.headers["Accept"]) {
    request.headers["Accept"] = "application/json";
  }

  if (!!!request.headers["Content-Type"]) {
    request.headers["Content-Type"] = "application/json";
  }

  // ------------------------------------------------------------- csr :  add accessToken in req header with universal
  const cookie = new Cookies(String(request.headers.cookie));
  const user = cookie.get("userData");
  console.log("252525 :", user?.userLoginData?.accessToken);

  if (
    user &&
    user?.userLoginData?.accessToken &&
    !request.headers.accessToken
  ) {
    console.log("33333 :", user?.userLoginData?.accessToken);
    request.headers.accessToken = `${user?.userLoginData?.accessToken}`;
  }

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
  console.log(
    "Updated request headers in finaaaaaaaaaaaaaaaal :",
    request.headers
  );
  return request;
};

interface AxiosErrorProps extends AxiosError {
  config: AxiosError["config"] & {
    _retry: boolean;
  };
}

const errorHandler = (error: AxiosErrorProps) => {
  const originalRequest = error.config;
  console.log("error get in errorHandler:", error);

  if (error.code === "ERR_NETWORK")
    console.log(
      "vpn خود را قطع و از برقراری ارتباط اینترنت خود اطمینان حاصل نمایید."
    );
  // ErrorToast({
  //   msg: "vpn خود را قطع و از برقراری ارتباط اینترنت خود اطمینان حاصل نمایید.",
  // });
  if (
    error?.response?.status === 500 &&
    originalRequest.url === ApiRoutes.refresh_token
  ) {
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
  return response;
};

API.interceptors.request.use((request) => requestHandler(request));
API.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => successHandler(response),
  (error) => errorHandler(error)
);

const refreshAuthLogic = async (failedRequest: AxiosError) => {
  console.log("refreshAuthLogic runned ............");

  const cookie = new Cookies(failedRequest?.config?.headers?.cookie || "");
  const user = cookie.get("userData");
  console.log("refresh runned ....", user);

  if (!user || !user?.userLoginData.refreshToken) {
    return Promise.reject();
  }

  const formData = {
    refreshToken: user?.userLoginData?.refreshToken,
  };

  console.log("formData :", formData);

  console.log(
    "prev accessToken in universal cookie :",
    user?.userLoginData?.accessToken
  );

  console.log("refresh posted .. :");

  return await Axios.post(
    // `${Config.APIURL}${ApiRoutes.refresh_token}`,
    `https://kidzyshop.podland.ir/shop/api${ApiRoutes.refresh_token}`,
    {},
    { headers: formData }
  )
    .then(({ status, data }) => {
      console.log("c100");
      if (status === 200) {
        console.log("c200");
        if (
          data?.singleResult?.accessToken &&
          data?.singleResult?.refreshToken
        ) {
          console.log("c300");

          console.log(
            "c400",
            "accessToken",
            data.singleResult.accessToken,
            "refreshToken",
            data.singleResult.refreshToken
          );

          // ----------------------------------- in csr => way 1
          // cookie.set(
          //   "userData",
          //   {
          //     userLoginData: {
          //       ...user.userLoginData,
          //       accessToken: data.singleResult.accessToken,
          //       refreshToken: data.singleResult.refreshToken,
          //     },
          //   },
          //   {
          //     path: "/",
          //     // httpOnly :true,
          //     // secure: true,
          //     sameSite: "strict",
          //     expires: new Date(Date.now() + 60 * 60 * 24 * 365),
          //   }
          // );

          console.log("c500");
          // ----------------------------------- in csr with state zustand => way 2
          const { changeData } = userDataStore();
          changeData({
            accessToken: data.singleResult.accessToken,
            refreshToken: data.singleResult.refreshToken,
          });

          console.log("c700", failedRequest);

          // failedRequest.response.config.headers["accessToken"] = `${data.singleResult.accessToken}`;
          // return Promise.resolve();

          if (failedRequest?.config?.headers) {
            failedRequest.config.headers[
              "accessToken"
            ] = `${data.singleResult.accessToken}`;
            console.log("failedRequest laaaaaaaaaaast :", failedRequest);
            return Promise.resolve();
          }
        }
      }
    })
    .catch((error) => {
      if (error?.response?.status === 400) {
        console.log("error in interceptor :", error);
      }
    });
};

createAuthRefreshInterceptor(API, refreshAuthLogic, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
});

export default API;
