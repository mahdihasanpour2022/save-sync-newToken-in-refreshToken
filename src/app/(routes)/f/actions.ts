"use server";

import { NextResponse } from "next/server";

export async function setCookie() {
  const response = NextResponse.next();
  response.cookies.set("name", "lee", {
    httpOnly: true,
    secure: false,
    path: "/",
  });

  return response;
}
