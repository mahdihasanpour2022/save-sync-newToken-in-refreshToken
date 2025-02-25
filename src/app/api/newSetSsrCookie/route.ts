import { NextResponse } from "next/server";

export async function GET() {
  // ایجاد پاسخ
  const response = NextResponse.json({ message: "Cookie set successfully" });

  // تنظیم کوکی
  response.cookies.set("name", "lee", {
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite :"strict"
  });

  return response;
}
