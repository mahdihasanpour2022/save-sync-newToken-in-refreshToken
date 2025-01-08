"use client";
import Link from "next/link";
import { useUserDataStore } from "@/stores/useUserDataStore";

export default function Home() {
  const userLoginData = useUserDataStore((state) => state.userLoginData);
  const changeData = useUserDataStore((state) => state.changeData);
  const clearData = useUserDataStore((state) => state.clearData);

  return (
    <nav>
      <p>{`env :  ${process.env.NEXT_PUBLIC_ENV}`}</p>
      <p>{`API_URL :  ${process.env.NEXT_PUBLIC_API_URL}`}</p>
      <p>{`API_URL :  ${process.env.NEXT_PUBLIC_API_URL}`}</p>
      <ul className="text-center pt-16 flex flex-col gap-6">
        <Link href="/a">
          <li className="border w-fit mx-auto px-6 py-4 rounded-full font-bold">
            A_server
          </li>
        </Link>
        <Link href="/b">
          <li className="border w-fit mx-auto px-6 py-4 rounded-full font-bold">B</li>
        </Link>
        <Link href="/c">
          <li className="border w-fit mx-auto px-6 py-4 rounded-full font-bold">
            C_client
          </li>
        </Link>
      </ul>
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
      <br />
      <button onClick={() => clearData("userData")}>logout</button>
      <br />
      <div className="text-center border my-16">
        {JSON.stringify(userLoginData)}
      </div>
    </nav>
  );
}
