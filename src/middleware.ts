import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const userData = request.cookies.get("userData")?.value;

  const myCookie = request.cookies.get("myCookie")?.value;
  console.log("myCookie in middleware is httpOnly : true :", myCookie);


  // console.log("userData in middleware :", userData);
  const userCookie = userData ? JSON.parse(userData) : null;
  console.log("userData in middleware is httpOnly : false:", userCookie?.userLoginData);

  if (!userData) {
    console.log("redirect in middleware to home bacause has not cookie");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // const response = NextResponse.next();
  // response.cookies.set(
  //   "middleware",
  //   JSON.stringify({
  //     middlewareCoolie :'middleware data'
  //   }),
  //   // JSON.stringify({
  //   //   ...userCookie,
  //   //   userLoginData: { ...userCookie?.userLoginData },
  //   // }),
  //   {
  //     httpOnly: false,
  //     secure: false,
  //     path: "/",
  //     sameSite: "lax",
  //     // maxAge: 1000 * 60 * 60 * 24 * 7,
  //     expires :new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
  //   }
  // );
  // return response;

  return NextResponse.next();
}

export const config = {
  matcher: ["/a", "/b", "/c", "/d", "/e"],
};
