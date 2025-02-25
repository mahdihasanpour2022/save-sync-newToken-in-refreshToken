"use server";
import Fcmp from "@/features/f/components/Fcmp";

import { cookies } from "next/headers";
// import { setCookie } from './actions';
const page = async () => {
  const cookieStore = await cookies();
  //--------------------------------------------------------------------------- get client cookie in ssr cmp with next/headers
  const allCookies = cookieStore.getAll();
  console.log("ssr get allCookies :", allCookies);

  const ssrCookie = cookieStore.get("ssrCookie _set in csr");
  console.log("ssrCookie >>>>>>> :", ssrCookie);
  const cookieValue = ssrCookie?.value ? JSON.parse(ssrCookie.value) : undefined;
  console.log("ssr jafarCookies :", cookieValue);

  // await setCookie();
  // await fetch("http://localhost:3000/api/newSetSsrCookie");

  //---------------------------------------------------------------------------set httpOnly : true cookie in ssr cmp with ( Route Handler + next/headers )
  // await fetch("http://localhost:3000/api/setCookie", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   credentials: "include",
  //   body: JSON.stringify({
  //     cookieName: "ssrCookie in ssr",
  //     cookieData: { name: "ssrCookie set in ssr with api route" },
  //     options: {
  //       path: "/",
  //       secure: true,
  //       httpOnly: true,
  //       sameSite: "lax", // lax strict
  //       maxAge: 1000 * 60 * 60 * 24 * 365,
  //       expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  //     },
  //   }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => console.log(data))
  //   .catch((error) => console.error("Error setting cookie:", error));

  //---------------------------------------------------------------------------set httpOnly : false cookie in ssr cmp with ( Route Handler + next/headers )
  // await fetch("http://localhost:3000/api/setCookie", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   credentials: "include",
  //   body: JSON.stringify({
  //     cookieName: "csrCookie in ssr",
  //     cookieData: { name: "csrCookie set in ssr with api route" },
  //     options: {
  //       path: "/",
  //       secure: false,
  //       httpOnly: false,
  //       sameSite: "lax", // lax strict
  //       maxAge: 1000 * 60 * 60 * 24 * 365,
  //       expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  //     },
  //   }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => console.log(data))
  //   .catch((error) => console.error("Error setting cookie:", error));

  //---------------------------------------------------------------------------get httpOnly : true cookie in ssr cmp with ( Route Handler + next/headers )
  // await fetch("http://localhost:3000/api/getCookie", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ cookieName: "httpOnly in csr" }), // ارسال نام کوکی به‌صورت داینامیک
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     if (data.error) {
  //       console.error(data.error);
  //     } else {
  //       console.log(`Cookie :`, data.cookieValue);
  //     }
  //   })
  //   .catch((error) => console.error("Error retrieving cookie:", error));

  //---------------------------------------------------------------------------set httpOnly : true cookie in ssr cmp with next/headers مستقیم نمیتونیم استفاده کنیم
  // Error: Cookies can only be modified in a Server Action or Route Handler.
  // cookieStore.set("ssr cookie", "lee", {
  //   path: "/",
  //   secure: true,
  //   httpOnly: true,
  //   sameSite: "lax", // lax strict
  //   maxAge: 1000 * 60 * 60 * 24 * 365,
  //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  // });

  // cant set cookie in ssr cmp with universal
  // const cookie = new Cookies(); //  universal
  // //---------------------------------------------------------------------------set client cookie in csr cmp with universal-cookie
  // cookie.set(
  //   "csrCookie _ set in ssr",
  //   { name: "asghar" },
  //   {
  //     path: "/",
  //     secure: false,
  //     httpOnly: false,
  //     sameSite: "strict", // lax strict
  //     maxAge: 1000 * 60 * 60 * 24 * 365,
  //     expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  //   }
  // );

  // //---------------------------------------------------------------------------set server cookie in ssr cmp with universal-cookie
  // cookie.set(
  //   "ssrCookie _ set in ssr",
  //   { name: "asghar" },
  //   {
  //     path: "/",
  //     secure: true,
  //     httpOnly: true,
  //     sameSite: "strict", // lax strict
  //     maxAge: 1000 * 60 * 60 * 24 * 365,
  //     expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  //   }
  // );

  return <Fcmp name={cookieValue?.name ? cookieValue.name : undefined} />;
};

export default page;
