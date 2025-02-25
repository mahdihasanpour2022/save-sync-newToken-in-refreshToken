"use client";
import Link from "next/link";
import { useUserDataStore } from "@/stores/useUserDataStore";
// import { useEffect } from "react";

export default function Home() {
  const userLoginData = useUserDataStore((state) => state.userLoginData);
  const changeData = useUserDataStore((state) => state.changeData);
  const clearData = useUserDataStore((state) => state.clearData);

  // useEffect(() => {
  //   // fetch("/api/user", {
  //   //   method: "GET",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   credentials: "include",
  //   // })
  //   //   .then((response) => response.json())
  //   //   .then((data) => console.log(data))
  //   //   .catch((error) => console.error("Error setting cookie:", error));

  //   fetch("/api/setCookie", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //     body: JSON.stringify({
  //       cookieName: "jafar",
  //       cookieData: { name: "jafar" },
  //       options: {
  //         secure: true,
  //       },
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error("Error setting cookie:", error));
  // }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     fetch("/api/getCookie", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ cookieName: "myCookie" }), // ارسال نام کوکی به‌صورت داینامیک
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data.error) {
  //           console.error(data.error);
  //         } else {
  //           console.log(`Cookie :`, data.cookieValue);
  //         }
  //       })
  //       .catch((error) => console.error("Error retrieving cookie:", error));
  //   }, 2000);
  // }, []);

  return (
    <nav>
      <div className="text-center border my-2">
        {JSON.stringify(userLoginData)}
      </div>
      <div className="flex flex-col justify-center items-center gap-4 py-2">
        <button
          className="border w-32 py-2"
          onClick={() =>
            changeData({
              //هم اکسس هم رفرش منقضی
              // refreshToken: "6875e83dfe3a47e1bcd8d557e6b92142.XzIwMjUx",
              // accessToken: "8308225576-14Bd892f69f04aa7b89525a838407f1d.XzIwMjUx",
              // رفرش اکیه ولی اکسس منقضی
              refreshToken: "d95b792fe15b4c9388ed54b5ec1035cb.XzIwMjUx",
              accessToken:
                "8308225576-14Bd892f69f04aa7b89525a838407f1d.XzIwMjUx",
            })
          }
        >
          login
        </button>
        <button
          onClick={() => clearData("userData")}
          className="border w-32 py-2"
        >
          logout
        </button>
      </div>

      <ul className="text-center py-2 flex flex-col gap-6 bg-blue-300">
        <Link href="/a">
          <li className="border w-48 mx-auto py-4 rounded-full font-bold text-white border-white">
            server___(a)
          </li>
        </Link>
        <Link href="/c">
          <li className="border w-48 mx-auto py-4 rounded-full font-bold text-white border-white">
            client___(c)
          </li>
        </Link>
        <Link href="/d">
          <li className="border w-48 mx-auto py-4 rounded-full font-bold text-white border-white">
            server___(d_3call)
          </li>
        </Link>
        <Link href="/e">
          <li className="border w-48 mx-auto py-4 rounded-full font-bold text-white border-white">
            client___(e_3call)
          </li>
        </Link>
        <Link href="/f">
          <li className="border w-48 mx-auto py-4 rounded-full font-bold text-white border-white">
            cookie csr & ssr___(f)
          </li>
        </Link>
        {/* <Link href="/b">
          <li className="border w-48 mx-auto py-4 rounded-full font-bold text-white border-white">
            B
          </li>
        </Link> */}
      </ul>
    </nav>
  );
}
