export  const setDataInLocal = ({ key, data }: { key: string; data: object }) => {
  const userDataLocal = localStorage.getItem(key);
  if (userDataLocal !== null) {
    const parsedUserDataLocal = JSON.parse(userDataLocal || "{}");
    localStorage.setItem(
      key,
      JSON.stringify({
        ...parsedUserDataLocal,
        userLoginData: { ...parsedUserDataLocal.userLoginData, ...data },
      })
    );
  }
};