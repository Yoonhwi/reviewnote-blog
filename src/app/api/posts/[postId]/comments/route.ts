import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const page = req.nextUrl.searchParams.get("page") ?? "1";
  const pageSize = 4;
  const startIdx = (Number(page) - 1) * pageSize;

  try {
    const totalComments = await client.comment.count({
      where: { postId: Number(params.postId) },
    });

    const comments = await client.comment.findMany({
      where: { postId: Number(params.postId), parentId: null },
      orderBy: {
        id: "desc",
      },
      skip: startIdx,
      take: pageSize,
      include: {
        children: {
          orderBy: {
            id: "desc",
          },
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
        },
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

    const totalPage = Math.ceil(totalComments / pageSize);

    return NextResponse.json({ comments, totalPage }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const userId = req.headers.get("current-user-id");

  try {
    const body = await req.json();
    const data = {
      ...body,
      userId: Number(userId),
      postId: Number(params.postId),
    };
    await client.comment.create({
      data,
    });
    return NextResponse.json({ message: "Comment created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to create comment", error: err },
      { status: 500 }
    );
  }
}
