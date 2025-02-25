import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { cookieName, cookieData, options } = await request.json();

    if (!cookieName || !cookieData) {
      return NextResponse.json(
        { error: "Cookie name and data are required." },
        { status: 400 }
      );
    }

    // Parse options or set defaults
    const {
      httpOnly = true,
      secure = process.env.NEXT_PUBLIC_ENV === "production",
      sameSite = process.env.NEXT_PUBLIC_ENV === "production"
        ? "strict"
        : "lax",
      path = "/",
      maxAge = 60 * 60 * 24 * 7,
    } = options || {};

    // Set the cookie
    const response = NextResponse.json({
      message: "Cookie set successfully",
      cookieName,
      cookieData,
    });

    response.cookies.set(cookieName, JSON.stringify(cookieData), {
      httpOnly,
      secure,
      sameSite,
      path,
      maxAge,
    });

    return response;
  } catch (error) {
    console.error("Error setting cookie:", error);
    return NextResponse.json(
      { error: "Failed to set cookie. Please check your request." },
      { status: 500 }
    );
  }
}
