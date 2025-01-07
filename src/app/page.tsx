import Link from "next/link";

export default function Home() {
  return (
    <nav>
      <ul className="text-center pt-16 flex flex-col gap-6">
        <Link href="/a">
          <li className="border w-fit mx-auto px-6 py-4 rounded-full font-bold">A</li>
        </Link>
        <Link href="/b">
          <li className="border w-fit mx-auto px-6 py-4 rounded-full font-bold">B</li>
        </Link>
      </ul>
    </nav>
  );
}
