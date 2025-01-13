"use server";

import { cookies } from "next/headers";

export async function createCampaignCookie(value: string) {
  if (value === "") return;
   (await cookies()).set({
    name: "action-cookie",
    value: value,
    httpOnly: false,
    secure: true,
    path: "/",
  });
}