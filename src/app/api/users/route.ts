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
      data: user,
    });

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "meta" in err) {
      const meta = (err as { meta?: { target: string[] } }).meta;
      if (meta && Array.isArray(meta.target)) {
        const errorTarget = meta.target[0];
        if (errorTarget === "userId") {
          if (errorTarget === "userId") {
            return NextResponse.json(
              {
                message: "Failed to create user",
                error: "User ID already exists",
              },
              { status: 409 }
            );
          } else if (errorTarget === "nickname") {
            return NextResponse.json(
              {
                message: "Failed to create user",
                error: "Nickname already exists",
              },
              { status: 422 }
            );
          }
        }
      }
    }

    return NextResponse.json(
      { message: "Failed to create user", error: err },
      { status: 500 }
    );
  }
}
