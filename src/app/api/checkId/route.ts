import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  //회원가입시 ID중복체크
  try {
    const user = await client.user.findUnique({
      where: {
        userId: body.userId,
      },
    });

    if (user) {
      return NextResponse.json(
        { message: "Already Exist user-id" },
        { status: 409 }
      );
    } else {
      return NextResponse.json(
        { message: "Available user-id" },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
