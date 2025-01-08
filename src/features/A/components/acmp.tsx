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
          })
        }
      >
        login
      </button>
      <button onClick={() => changeData({ name: "jafar", age: 30 })}>
        changeData
      </button>
        <button onClick={() => clearData("userData")}>logout</button>
    </div>
  );
};

export default Acmp;
