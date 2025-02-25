"use client";
import { useEffect } from "react";
import Cookies from "universal-cookie";

const Fcmp = ({ name }: { name: string | null }) => {
  const cookie = new Cookies();

  useEffect(() => {
    console.log("nameeeeeeee :", name);
  }, [name]);

  //---------------------------------------------------------------------------set client cookie in csr cmp with universal-cookie
  // cookie.set(
  //   "csrCookie _ set in csr",
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

  //--------------------------------------------------------------------------- get client cookie in csr cmp with universal-cookie
  const csrAllCookies = cookie.getAll();
  console.log("csr get AllCookies :", csrAllCookies);

  //--------------------------------------------------------------------------- set client cookie in csr cmp with universal-cookie
  // You cannot get or set httpOnly cookies from the browser, only the server
  // cookie.set(
  //   "ssrCookie _ set in csr",
  //   { cookiiType: "ssrCookie _ set in csr },
  //   {
  //     path: "/",
  //     secure: true,
  //     httpOnly: true,
  //     sameSite: "lax", // lax strict
  //     maxAge: 1000 * 60 * 60 * 24 * 365,
  //     expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  //   }
  // );

  const cookieHandler = () => {
    //--------------------------------------------------------------------------- set client cookie in csr cmp with ( Route Handler + next/headers )
    fetch("http://localhost:3000/api/setCookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        cookieName: "ssrCookie _ set in csr",
        cookieData: { name: "jafar" },
        options: {
          secure: true,
          httpOnly: true,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("ssrCookie :", data))
      .catch((error) => console.error("Error setting cookie:", error));
  };

  const changeCookieDataHandler = () => {
    fetch("http://localhost:3000/api/setCookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        cookieName: "ssrCookie _ set in csr",
        cookieData: { name: "asghar" },
        options: {
          secure: true,
          httpOnly: true,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("ssrCookie :", data))
      .catch((error) => console.error("Error setting cookie:", error));
  };

  const getSsrCookieHandler = () => {
    //---------------------------------------------------------------------------get httpOnly : true cookie in csr cmp with ( Route Handler + next/headers )
    fetch("http://localhost:3000/api/getCookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cookieName: "ssrCookie _ set in csr" }), // ارسال نام کوکی به‌صورت داینامیک
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          // console.log(`Cookie :`, data.cookieValue);
          alert(data.cookieValue.name);
        }
      })
      .catch((error) => console.error("Error retrieving cookie:", error));
  };

  return (
    <>
      <div className="border-b w-fll h-fit py-1 border-gray-400 text-center">
        {name ?? ""}
      </div>
      <div className="pb-6">
        <p>{`in csr ==> :`}</p>
        <p className="pl-20">{` set :`}</p>
        <p className="pl-32">
          {` (httpOnly = false) + universal `}
          <span className="font-medium border p-1 border-gray-400">
            &#10003;
          </span>
        </p>
        <p className="pl-32">
          {` (httpOnly = true) + api route + next/header `}
          <span className="font-medium border p-1 border-gray-400">
            &#10003;
          </span>
        </p>
        <p className="pl-20">{` get :`}</p>
        <p className="pl-32">
          {` (httpOnly = false) + universal `}
          <span className="font-medium border p-1 border-gray-400">
            &#10003;
          </span>
        </p>
        <p className="pl-32">
          {` (httpOnly = true) + api route + next/header `}
          <span className="font-medium border p-1 border-gray-400">
            &#10003;
          </span>
        </p>
      </div>
      <div className="">
        <p>{`in ssr ==> :`}</p>
        <p className="pl-20">{` set :`}</p>
        <p className="pl-32">
          {` (httpOnly = false) + universal `}
          <span className="font-bold border-2 p-1 border-black">&#10006;</span>
        </p>
        <p className="pl-32">
          {` (httpOnly = true) + api route + next/header `}
          <span className="font-bold border-2 p-1 border-black">&#10006;</span>
        </p>
        <p className="pl-20">{` get :`}</p>
        <p className="pl-32">
          {` (httpOnly = false) + universal `}
          <span className="font-medium border p-1 border-gray-400">
            &#10003;
          </span>
        </p>
        <p className="pl-32">
          {` (httpOnly = true) + api route + next/header `}
          <span className="font-medium border p-1 border-gray-400">
            &#10003;
          </span>
        </p>
      </div>
      <button
        type="button"
        onClick={cookieHandler}
        className=" absolute z-10 border border-black p-2 px-4 top-32  right-32 "
      >
        set httpOnly cookie in csr
      </button>
      <button
        type="button"
        onClick={changeCookieDataHandler}
        className=" absolute z-10 border border-black p-2 px-4 top-48  right-32 "
      >
        change httpOnly cookie data in csr
      </button>
      <button
        type="button"
        onClick={getSsrCookieHandler}
        className=" absolute z-10 border-2 border-green-500 p-2 px-4 top-64  right-32 "
      >
        get httpOnly cookie with api route
      </button>
    </>
  );
};

export default Fcmp;
