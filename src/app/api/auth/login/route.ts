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

  const user = await client.user.findUnique({
    where: { userId: body.userId },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  if (!(await compare(body.password, user.password))) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  const { password, ...userBody } = user; // eslint-disable-line no-unused-vars

  const acessToken = generateToken(
    {
      id: user.id,
      userId: user.userId,
      nickname: user.nickname,
      role: user.role,
      createdAt: user.createdAt,
    },
    "1h"
  );

  const refreshToken = generateToken(
    {
      id: user.id,
      userId: user.userId,
      nickname: user.nickname,
      role: user.role,
      createdAt: user.createdAt,
    },
    "7d"
  );

  const response = NextResponse.json({ data: userBody }, { status: 200 });
  response.cookies.set("access-token", acessToken);
  response.cookies.set("refresh-token", refreshToken);
  return response;
}
