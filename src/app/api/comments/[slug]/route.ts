import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const client = new PrismaClient();

export async function GET({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const comment = await client.comment.findUnique({
    where: { id: Number(slug) },
  });
  return NextResponse.json({ comment }, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const body = await request.json();
  const slug = params.slug;
  const comment = await client.comment.update({
    where: { id: Number(slug) },
    data: { ...body },
  });
  return NextResponse.json({ comment }, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const userId = req.headers.get("current-user-id");
  console.log(userId);

  const comment = await client.comment.findUnique({
    where: { id: Number(slug) },
  });

  if (!comment) {
    return NextResponse.json({ message: "Comment not found" }, { status: 404 });
  }

  await client.comment.delete({
    where: { id: Number(slug) },
  });
  return NextResponse.json(
    { message: `${slug} Comment deleted` },
    { status: 200 }
  );
}
