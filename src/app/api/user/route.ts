import { cookies } from "next/headers";

export async function GET() {
  (await cookies()).set("name", "ali", {
    httpOnly: true,
    secure: true,
    path: "/",
  });
  return Response.json({ success: true });
}
