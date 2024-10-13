import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("access-token");

  if (!accessToken) {
    return NextResponse.json({ data: null }, { status: 200 });
  }

  try {
    const user = jwt.verify(accessToken.value, process.env.JWT_SECRET!);
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: null }, { status: 200 });
  }
}
