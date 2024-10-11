import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout" });
  response.cookies.delete("access-token");
  response.cookies.delete("refresh-token");
  return response;
}
