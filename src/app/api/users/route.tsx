import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

interface AddUser {
  userId: string;
  nickname: string;
  role: string;
  password: string;
  profile: string;
}

const client = new PrismaClient();

export async function GET() {
  try {
    const users = await client.user.findMany();
    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: AddUser = await req.json();
    const hashedPassword = await hash(body.password, 10);
    const user = { ...body, password: hashedPassword };

    await client.user.create({
      data: { ...body, password: hashedPassword },
    });
    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to create user", error: err },
      { status: 500 }
    );
  }
}
