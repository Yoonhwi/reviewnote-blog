import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "../../utils";

export interface Login {
  userId: string;
  password: string;
}

const client = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("body:", body);
  const user = await client.user.findUnique({
    where: { userId: body.userId },
  });
  //password 제외하고 user정보만 보내기

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  // 나중에 암호화로 수정해야함
  if (!(await compare(body.password, user.password))) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  const acessToken = generateToken(
    {
      userId: user.userId,
      nickname: user.nickname,
      role: user.role,
      createdAt: user.createdAt,
    },
    "1h"
  );

  const refreshToken = generateToken(
    {
      userId: user.userId,
      nickname: user.nickname,
      role: user.role,
      createdAt: user.createdAt,
    },
    "7d"
  );

  const response = NextResponse.json({}, { status: 200 });
  response.cookies.set("access-token", acessToken);
  response.cookies.set("refresh-token", refreshToken);
  return response;
}
