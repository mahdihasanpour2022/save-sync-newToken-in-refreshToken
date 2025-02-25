import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // گرفتن اطلاعات از درخواست
    const { cookieName } = await request.json();
    console.error("cookieName:", cookieName);

    if (!cookieName) {
      return NextResponse.json(
        { error: "Cookie name is required." },
        { status: 400 }
      );
    }

    // گرفتن کوکی‌ها
    const cookieStore = await cookies();
    const cookieValue = cookieStore.get(cookieName);

    console.error("cookieValue:", cookieValue);
    if (!cookieValue) {
      return NextResponse.json(
        { error: `Cookie with name "${cookieName}" not found.` },
        { status: 404 }
      );
    }

    // برگرداندن مقدار کوکی
    return NextResponse.json({
      message: "Cookie retrieved successfully",
      cookieName,
      cookieValue: JSON.parse(cookieValue.value),
    });
  } catch (error) {
    console.error("Error retrieving cookie:", error);
    return NextResponse.json(
      { error: "Failed to retrieve cookie." },
      { status: 500 }
    );
  }
}
