import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const client = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const post = await client.post.findUnique({
    where: { id: Number(slug) },
  });
  return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const body = await request.json();
  const slug = params.slug;
  const post = await client.post.update({
    where: { id: Number(slug) },
    data: { ...body },
  });
  return NextResponse.json({ post }, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  const post = await client.post.findUnique({
    where: { id: Number(slug) },
  });

  if (!post) {
    return new NextResponse("Post not found", { status: 404 });
  }

  await client.post.delete({
    where: { id: Number(slug) },
  });
  return new NextResponse(`${slug} post deleted`, { status: 200 });
}
