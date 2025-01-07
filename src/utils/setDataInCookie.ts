import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setDataInCookie = ({
  key,
  data,
}: {
  key: string;
  data: object;
}) => {
  const userDataCookie = cookies.get(key);
  if (userDataCookie !== null && userDataCookie?.userLoginData) {
    cookies.set(key, {
      ...userDataCookie,
      userLoginData: { ...userDataCookie.userLoginData, ...data },
    });
  }
};
