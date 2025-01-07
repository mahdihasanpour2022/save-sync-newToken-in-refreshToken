import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "universal-cookie";

const cookies = new Cookies();

type NameStore = {
  userLoginData: {
    name?: string;
    age?: number;
  };
  changeData: (data: object) => void;
  clearData: (key: string) => void;
};

// زاستند که در سمت کلاینت طراحی شده است، نمی‌تواند به طور مستقیم در میدلور استفاده شود
export const useUserDataStore = create<NameStore>()(
  persist(
    (set) => ({
      userLoginData: {
        // name: "mehdi",
        // age: 37
      },
      changeData: (data: object) => {
        set((state) => ({ ...state, userLoginData: { ...state.userLoginData ,...data } }));
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
          if (cookieValue)
            return JSON.stringify({ state: cookieValue, version: 0 });
          // اگر میخواهید با رفرش صفحه دیتا قابل استفاده برای اپدیت استیت باشد باید بر این فرمت باشد { state: { ...yourState }, version: number }
          // اگر کوکی شامل دیتایی باین نام نبود لوکال برای اپدیت استیت با مقدار قبلی استفاده میشود.
          const localValue = localStorage.getItem(key);
          return localValue
            ? JSON.stringify({ state: JSON.parse(localValue), version: 0 })
            : null;
        },
        setItem: (key, value) => {
          // با هر تغییر استیت بلافاصله در کوکی و لوکال اپدیت میشود
          const parsedValue = value ? JSON.parse(value) : {};
          if (parsedValue && parsedValue?.state?.userLoginData) {
            const currentUserData = parsedValue.state;
            cookies.set(key, currentUserData, {
              path: "/",
              // httpOnly : true ,
              // secure: true,
              sameSite: "strict",
              // expires : new Date(Date.now() + (60 *60*24*365))
            }); // prevent CSRF  attacks
            localStorage.setItem(key, JSON.stringify(currentUserData));
          }
        },
        removeItem: (key) => {
          localStorage.removeItem(key);
          cookies.remove(key);
        },
      })),
      onRehydrateStorage: () => (
        // state
      ) => {
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
