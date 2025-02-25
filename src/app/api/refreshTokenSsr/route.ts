/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import Axios from "axios";

export async function POST(req: NextRequest) {
  try {
    // const cookieStore = await cookies();
    // const userDataCookie = cookieStore.get("userData");
    // const userCookie = userDataCookie ? JSON.parse(userDataCookie.value) : null;

    console.log("reqqqqqqqqqqq", req);

    const body = await req.json();
    const { accessToken = "", refreshToken = "" } = body;

    if (!refreshToken || !accessToken) {
      return NextResponse.json(
        { error: "Refresh token not found" },
        { status: 400 }
      );
    }

    const response = await Axios.post(
      "https://kidzyshop.podland.ir/shop/api/account/refresh-token",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          refreshToken: refreshToken,
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      const { accessToken, refreshToken } = response.data.singleResult || {};
      if (accessToken && refreshToken) {
        
        return NextResponse.json(
          { accessToken, refreshToken },
          { status: 200 }
        );
      }
    }

    return NextResponse.json(
      { error: "Invalid response from upstream" },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
