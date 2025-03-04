"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

const DisableWorkbox = () => {
  // workbox in console for Turbopack ==> توربو پک در نکست 15 جایگزین وب پک شده است و پیامهایی که در کنسول میبینید مربوط به  بارگذاری مجدد ماژول‌ها هستند با این خط کد حذف میشوند در دولوپ

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.debug = () => {}; // فیلتر کردن لاگ‌های Turbopack
    }
  }, []);

  return null;
};

export default DisableWorkbox; // اگر در فاز دولوپ در کنسول لاگ های ورک باکس دیدی این کامپوننت رو در لی اوت اصلی وار د کن احتمالا رفع میشه
