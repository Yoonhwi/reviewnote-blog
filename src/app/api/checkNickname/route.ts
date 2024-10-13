import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  //회원가입시 닉네임 중복체크
  try {
    const user = await client.user.findUnique({
      where: {
        nickname: body.nickname,
      },
    });

    if (user) {
      return NextResponse.json(
        { message: "Already Exist nickname" },
        { status: 409 }
      );
    } else {
      return NextResponse.json(
        { message: "Available nickname" },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
