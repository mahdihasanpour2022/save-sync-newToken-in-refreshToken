import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "universal-cookie";
// import { cookies } from "next/headers";

const cookies = new Cookies();

export type UserDataType = {
  name?: string;
  age?: number;
  accessToken?: string;
  refreshToken?: string;
};

type NameStore = {
  userLoginData: UserDataType;
  changeData: (data: object) => void;
  clearData: (key: string) => void;
};

// زاستند که در سمت کلاینت طراحی شده است، نمی‌تواند به طور مستقیم در میدلور استفاده شود
export const useUserDataStore = create<NameStore>()(
  persist(
    (set) => ({
      userLoginData: {
        // name: "mehdi",
        // age: 37,
      },
      changeData: (data: object) => {
        // console.log("change data run >>>>>>>>>>>", data);
        set((state) => ({
          ...state,
          userLoginData: { ...state.userLoginData, ...data },
        }));
      },
      clearData: (key: string) => {
        set((state) => ({ ...state, userLoginData: {} }));
        localStorage.removeItem(key);
        cookies.remove(key);
      },
    }),
    {
      name: "userData", // persist : sync state and local with name parameters
      // partialize: (state) => ({ age: state.age }), // filter what can save in local but this data in state cannt filtered and state has complete data
      // با استفاده از استوریج دیگر رفتار پیش فرض زاستند برای ذخیره استیت در لوکال لغو میشود ولی مزیتی که دارد میتوان در کوکی هم ذخیره کرد بصورت دستی
      storage: createJSONStorage(() => ({
        getItem: (key) => {
          // با اولین لود صفحه یا اولین رقرش اگر کوکی شامل دیتای با این نام بود استیت اپدیت میشود
          const cookieValue = cookies.get(key) || null;
          const localValue = localStorage.getItem(key);

          if (cookieValue) {
            // اگر لوکال استوریج فاقد این دیتا بود به کمک کوکی و همزمان با اپدیت استیت در لوکال هم ذخیره میشود.
            if (!localValue) {
              localStorage.setItem(key, JSON.stringify(cookieValue));
            }
            // اگر میخواهید با رفرش صفحه دیتا قابل استفاده برای اپدیت استیت باشد باید بر این فرمت باشد { state: { ...yourState }, version: number }
            // اگر کوکی شامل دیتایی باین نام نبود لوکال برای اپدیت استیت با مقدار قبلی استفاده میشود.
            return Promise.resolve(
              JSON.stringify({ state: cookieValue, version: 0 })
            );
          }
          // const localValue = localStorage.getItem(key);
          // return localValue
          //   ? JSON.stringify({ state: JSON.parse(localValue), version: 0 })
          //   : null;

          if (localValue) {
            const parsedValue = JSON.parse(localValue);
            // اگر کوکی فاقد مقدار باشد، کوکی را همزمان با استیت به کمک لوکال استوریج به‌روزرسانی کنید
            if (!cookieValue) {
              cookies.set(key, parsedValue, {
                path: "/",
                httpOnly: false,
                secure: false,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24 * 365,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
              });
            }
            return Promise.resolve(
              localValue
                ? JSON.stringify({ state: parsedValue, version: 0 })
                : null
            );
          }
          return Promise.resolve(null);
          // return Promise.resolve(
          //   localValue
          //     ? JSON.stringify({ state: JSON.parse(localValue), version: 0 })
          //     : null
          // );
          // return Promise.resolve(null);
        },
        setItem: async (key, value) => {
          // console.log("set item in zustand runed ....", key, value);
          // با هر تغییر استیت بلافاصله در کوکی و لوکال اپدیت میشود
          const parsedValue = value ? JSON.parse(value) : {};

          if (parsedValue && parsedValue?.state?.userLoginData) {
            // console.log("set item has userLoginData ... ", parsedValue);

            const currentUserData = parsedValue.state;
            // console.log("set item currentUserData", currentUserData);

            // const cookieStore = await cookies();
            // const userDataCookie = cookieStore.get("userData");
            // console.log("mehdi 1:", userDataCookie);
            
            // ذخیره کوکی سمت کلاینت
            cookies.set(key, currentUserData, {
              path: "/",
              // domain : 'https://localhost:3000',
              httpOnly: false,
              // secure true prevent MITM (man-in-the-middle) attack
              secure: false, // کوکی فقط روی اچ تی تی پی اس ارسال خواهد شد  ==> در دولوپ فالس باشد بهتر است ولی در پروداکشن حتماً ترو بگذارید.
              //
              // sameSite: "none", // lax strict none___ اگر دامنه‌ی فرانت‌اند و بک‌اند متفاوت است ، باید این مقدار را نان قرار دهید
              sameSite: "lax",
              maxAge: 1000 * 60 * 60 * 24 * 365,
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
            }); // prevent CSRF attacks

            // sameSite: "strict"  ==> فقط وقتی کوکی ارسال می‌شود که کاربر در سایت شما باشد. (امنیت بالاتر، ولی ممکن است روی عملکرد تأثیر بگذارد)
            // sameSite: "lax"  ===> کوکی در درخواست‌های عادی ارسال می‌شود، ولی در درخواست‌های third-party ارسال نمی‌شود. (تعادلی بین امنیت و عملکرد)
            // const cookieValueAfterSet = cookies.get(key) || null;
            // console.log("cookieValueAfterSet", cookieValueAfterSet);

            // localStorage.setItem(key, JSON.stringify(currentUserData));
          }
        },
        removeItem: (key) => {
          localStorage.removeItem(key);
          cookies.remove(key);
        },
      })),
      onRehydrateStorage: () => () => // state
      {
        // وقتی لاگ میگیرد که داده‌های ذخیره‌شده (مثل لوکال یا کوکی) توسط پرسیست بازیابی شده و به استیت منتقل شوند
        // console.log(
        //   "Rehydrated state run => data save in state from local or cookie:",
        //   state
        // );
      },
    }
  )
);

export const userDataStore = useUserDataStore.getState;

// در اینجا باید بررسی کنیم که لوکال تغییر کرده است
// if (typeof window !== "undefined") {
//   window.addEventListener("storage", (event) => {
//     console.log("111")
//     if (event.key === "userLoginData") {
//       const storedValue = localStorage.getItem("userLoginData");
//       if (storedValue) {
//         const parsedValue = JSON.parse(storedValue);
//         useUserDataStore.getState().changeData(parsedValue.state);
//       }
//     }
//   });
// }

// 3 way to get state

// const { changeData , userLoginData } = userDataStore();  in the client that not components like interceptor or functions
//   const userLoginData = useUserDataStore((state) => state.userLoginData);   in the client that is components
