import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function GET() {
  try {
    const posts = await client.post.findMany();
    return NextResponse.json({ posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await client.post.create({
      data: body,
    });
    return NextResponse.json({ message: "Post created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to create post", error: err },
      { status: 500 }
    );
  }
}
