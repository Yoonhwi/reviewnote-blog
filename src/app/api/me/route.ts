import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = req.headers.get("autorization");
  console.log(accessToken);
  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const user = jwt.verify(accessToken, process.env.JWT_SECRET!);
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
