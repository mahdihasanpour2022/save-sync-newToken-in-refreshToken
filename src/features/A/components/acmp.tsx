"use client";
import { useUserDataStore } from "@/stores/useUserDataStore";
// import useGetPodProfile from "@/features/A/hooks/useGetPodProfile";

const Acmp = () => {
  const userLoginData = useUserDataStore((state) => state.userLoginData);
  const changeData = useUserDataStore((state) => state.changeData);
  const clearData = useUserDataStore((state) => state.clearData);

  // const { data: podProfileData } = useGetPodProfile();
  // console.log("eeeeeeeeeeeeeeeeeeee :", podProfileData);

  // 5192640985-81106611678C4335a1e8258f1231fa28.XzIwMjUx  ===>  expired refresh
  return (
    <div className="flex flex-col">
      <div className="text-center border my-16">
        {JSON.stringify(userLoginData)}
      </div>
      <button
        onClick={() =>
          changeData({
            refreshToken: "6875e83dfe3a47e1bcd8d557e6b92142.XzIwMjUx",
            accessToken: "8308225576-14Bd892f69f04aa7b89525a838407f1d.XzIwMjUx",
            // idToken:
            //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyNDQ3MTQxNiIsIm5hdGlvbmFsX2NvZGUiOiIwODcyOTU5Nzc1IiwiaXNzIjoiaHR0cHM6Ly93d3cuZmFuYXBpdW0uY29tLyIsInBob25lX251bWJlciI6IjA5MjE3MTAxNzAwIiwicHJlZmVycmVkX3VzZXJuYW1lIjoibWVoZGkuaGFzYW5wb3VyIiwiZXhwIjoxNzM2MDk4OTg1LCJnaXZlbl9uYW1lIjoi2YXZh9iv24wiLCJpYXQiOjE3MzYwOTgwODUsImZhbWlseV9uYW1lIjoi2K3Ys9mGINm-2YjYsSIsInBpY3R1cmUiOiJodHRwczovL2NvcmUucG9kLmlyL256aC9pbWFnZS8_aW1hZ2VJZD00NTcyMDQ0Jmhhc2hDb2RlPTE5MTlmNmU4Y2YwLTAuODU0ODY5OTk0MjEyNTQ4NCIsImNsaWVudF9pZCI6IjIzMTUzNzQ2dzQyOGI0Mzc5YjFmNTBlYmQ0NDFiZmVhYSJ9.pDEHwcvpAVMQ5YSfjTtIWEDIHUUeRifEpdQNnJze7vqgSWRV4xdU18JqD9wiRhRGE7ekzx-SxzASlFFwJMQAqAnnG0lXZAmNk1200QqFfVDDRXKMyhbzsRpdryDIO9Zoxt-AxONreaMEluXmLWs41f76E_L_dwyEcfYt_yvzVVI",
            // firstName: "مهدی",
            // lastName: "حسن پور",
            // gender: "MAN_GENDER",
            // cellphoneNumber: "09217101700",
            // userId: 36531306,
            // username: "mehdi.hasanpour",
            // ssoId: "24471416",
          })
        }
      >
        login
      </button>
      <button onClick={() => changeData({ name: "jafar", age: 30 })}>
        changeData
      </button>
      {Object.keys(userLoginData).length > 0 && (
        <button onClick={() => clearData("userData")}>logout</button>
      )}
      {/* <button
        onClick={() =>
          setDataInCookie({ key: "userData", data: { age: 1000 } })
        }
      >
        direct set in cookie
      </button>
      <button
        onClick={() => setDataInLocal({ key: "userData", data: { age: 5000 } })}
      >
        direct set in local
      </button> */}
    </div>
  );
};

export default Acmp;
