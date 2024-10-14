import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { commentId: string } }
) {
  const userId = request.headers.get("current-user-id");
  const body = await request.json();
  const commentId = params.commentId;

  const comment = await client.comment.findUnique({
    where: { id: Number(commentId) },
  });

  const user = await client.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  if (!comment) {
    return new NextResponse("Comment not found", { status: 404 });
  }

  if (comment.userId !== Number(userId) && user?.role !== "admin") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await client.comment.update({
    where: { id: Number(commentId) },
    data: { ...body },
  });

  return NextResponse.json({ message: "success updated" }, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { commentId: string } }
) {
  const userId = req.headers.get("current-user-id");
  const commentId = params.commentId;

  const comment = await client.comment.findUnique({
    where: { id: Number(commentId) },
  });

  const user = await client.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!comment) {
    return NextResponse.json({ message: "Comment not found" }, { status: 404 });
  }

  if (comment.userId !== Number(userId) && user?.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await client.comment.delete({
    where: { id: Number(commentId) },
  });

  return NextResponse.json({ message: "success deleted" }, { status: 200 });
}
