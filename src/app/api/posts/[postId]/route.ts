import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const client = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const postId = params.postId;

  const post = await client.post.findUnique({
    where: { id: Number(postId) },
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
  return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const body = await request.json();
    const postId = params.postId;
    const post = await client.post.update({
      where: { id: Number(postId) },
      data: { ...body },
    });
    return NextResponse.json({ post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const postId = params.postId;
  const userId = req.headers.get("current-user-id");

  const post = await client.post.findUnique({
    where: { id: Number(postId) },
  });

  if (!post) {
    return new NextResponse("Post not found", { status: 404 });
  }

  if (post.userId !== Number(userId)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await client.post.delete({
    where: { id: Number(postId) },
  });

  return NextResponse.json(
    { message: `${postId} Post deleted` },
    { status: 200 }
  );
}
