import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const client = new PrismaClient();

export async function GET({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const user = await client.user.findUnique({
    where: { id: Number(slug) },
  });
  return NextResponse.json({ user }, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const body = await request.json();
  const slug = params.slug;
  const user = await client.user.update({
    where: { id: Number(slug) },
    data: { ...body },
  });
  return NextResponse.json({ user }, { status: 200 });
}

export async function DELETE({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const user = await client.user.findUnique({
    where: { id: Number(slug) },
  });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  await client.user.delete({
    where: { id: Number(slug) },
  });
  return new NextResponse(`${slug} User deleted`, { status: 200 });
}
