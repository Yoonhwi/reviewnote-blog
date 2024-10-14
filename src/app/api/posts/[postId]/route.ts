import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { extractMainImg } from "../../utils";

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
    const userId = request.headers.get("current-user-id");
    const user = await client.user.findUnique({
      where: { id: Number(userId) },
    });

    const post = await client.post.findUnique({
      where: { id: Number(params.postId) },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    if (post.userId !== Number(userId) && user?.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const mainImg = extractMainImg(body.content);

    const postId = params.postId;
    const responsePost = await client.post.update({
      where: { id: Number(postId) },
      data: {
        mainImg: mainImg ?? process.env.NEXT_PUBLIC_NONE_IMAGE,
        ...body,
      },
    });
    return NextResponse.json({ post: responsePost }, { status: 200 });
  } catch (err) {
    console.log(err);
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

  const user = await client.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  if (!post) {
    return new NextResponse("Post not found", { status: 404 });
  }

  if (post.userId !== Number(userId) && user?.role !== "admin") {
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
