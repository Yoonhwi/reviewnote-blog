import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({}, { status: 200 });
  response.cookies.set("access-token", "Hello, World!");
  return response;
}
