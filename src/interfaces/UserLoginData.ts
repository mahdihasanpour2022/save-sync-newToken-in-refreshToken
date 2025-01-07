export enum GenderEnum {
  BOY = "MAN_GENDER",
  GIRL = "WOMEN_GENDER",
}
export interface UserLoginData {
  parent: {
    refreshToken: string;
    accessToken: string;
    idToken: string;
    firstName: string;
    lastName: string;
    gender: GenderEnum;
    cellphoneNumber: string;
    userId: number;
    username: string;
    ssoId: string;
  };
  userLoggedIn: {
    firstName: string;
    lastName?: string;
    gender: GenderEnum;
    accessToken: string;
    refreshToken: string;
    isLoginProcessFinished: boolean;
    ssoId: number | string;
    userId: number | string;
    isParent: boolean;
  };
  revalidateAt: number;
}
