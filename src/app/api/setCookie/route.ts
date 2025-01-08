import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { accessToken = "", refreshToken = "" } = body;

  // بررسی اینکه مقادیر موجود هستند یا نه
  if (!accessToken || !refreshToken) {
    return NextResponse.json(
      { error: "Missing accessToken or refreshToken" },
      { status: 400 }
    );
  }

  const response = NextResponse.json({ message: "Cookie set successfully" });

  // تنظیم کوکی‌ها
  response.cookies.set(
    "userData1", // نام کوکی
    JSON.stringify({ accessToken, refreshToken }), // مقدار کوکی
    {
      path: "/", // مسیر کوکی
      httpOnly: false, // اگر می‌خواهید کوکی در دسترس جاوا اسکریپت هم باشد
      // secure: process.env.NEXT_PUBLIC_ENV === "Production", // اگر در محیط توسعه از HTTP استفاده می‌کنید، این گزینه را false قرار دهید
      secure: false, // اگر در محیط توسعه از HTTP استفاده می‌کنید، این گزینه را فالس قرار دهید
      sameSite: "lax", // تغییر از "Lax" به "lax"
      // maxAge: 1000 * 60 * 60 * 24 * 7,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // یک سال
    }
  );

  response.headers.set("Access-Control-Allow-Origin", "https://localhost:3000");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}
