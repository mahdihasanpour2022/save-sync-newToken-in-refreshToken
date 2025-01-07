import Link from "next/link";

export default function Home() {
  return (
    <nav>
      <p>{`env :  ${process.env.NEXT_PUBLIC_API_URL}`}</p>
      <p>{`env :  ${process.env.NEXT_PUBLIC_API_URL}`}</p>
      <ul className="text-center pt-16 flex flex-col gap-6">
        <Link href="/a">
          <li className="border w-fit mx-auto px-6 py-4 rounded-full font-bold">
            A_server
          </li>
        </Link>
        {/* <Link href="/b">
          <li className="border w-fit mx-auto px-6 py-4 rounded-full font-bold">B</li>
        </Link> */}
        <Link href="/c">
          <li className="border w-fit mx-auto px-6 py-4 rounded-full font-bold">
            C_client
          </li>
        </Link>
      </ul>
    </nav>
  );
}
