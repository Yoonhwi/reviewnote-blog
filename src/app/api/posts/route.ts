import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { extractMainImg } from "../utils";

export interface PostAdd {
  title: string;
  content: string;
}

const validatePostAdd = (params: Record<string, string>) => {
  if (!params.title) {
    throw new Error("Title is required");
  }
  if (!params.content) {
    throw new Error("Content is required");
  }
  if (typeof params.title !== "string") {
    throw new Error("Title must be a string");
  }
  if (typeof params.content !== "string") {
    throw new Error("Content must be a string");
  }
};

const client = new PrismaClient();

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page") ?? "1";
  const pageSize = 8;
  const startIdx = (Number(page) - 1) * pageSize;

  try {
    const totalPosts = await client.post.count();
    const posts = await client.post.findMany({
      orderBy: {
        id: "desc",
      },
      skip: startIdx,
      take: pageSize,
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            role: true,
            profile: true,
            createdAt: true,
          },
        },
      },
    });

    const totalPages = Math.ceil(totalPosts / pageSize);

    return NextResponse.json({ posts, totalPages }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get("current-user-id");

  try {
    const body = await req.json();
    const mainImg = extractMainImg(body.content);

    const data = {
      userId: Number(userId),
      mainImg: mainImg ?? process.env.NEXT_PUBLIC_NONE_IMAGE,
      ...body,
    };

    try {
      validatePostAdd(body);
    } catch (err) {
      console.log("err1", err);
      return NextResponse.json({ message: err }, { status: 400 });
    }
    const post = await client.post.create({
      data,
    });
    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    console.log("err2", err);
    return NextResponse.json(
      { message: "Failed to create post", error: err },
      { status: 500 }
    );
  }
}
