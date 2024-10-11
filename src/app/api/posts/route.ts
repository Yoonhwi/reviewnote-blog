import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export interface PostAdd {
  title: string;
  content: string;
  userId: number;
}

const validatePostAdd = (params: Record<string, any>) => {
  if (!params.title) {
    throw new Error("Title is required");
  }
  if (!params.content) {
    throw new Error("Content is required");
  }
  if (!params.userId) {
    throw new Error("UserId is required");
  }
  if (typeof params.title !== "string") {
    throw new Error("Title must be a string");
  }
  if (typeof params.content !== "string") {
    throw new Error("Content must be a string");
  }
  if (typeof params.userId !== "number") {
    throw new Error("UserId must be a number");
  }
};

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
  console.log("post post");
  const accessToken = req.cookies.get("access-token");
  console.log("accessToken:", accessToken);
  try {
    const body = await req.json();
    try {
      validatePostAdd(body);
    } catch (err) {
      return NextResponse.json({ message: err }, { status: 400 });
    }
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
