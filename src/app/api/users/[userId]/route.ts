import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const client = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;
  console.log("hit", userId);

  const user = await client.user.findUnique({
    where: { id: Number(userId) },
  });

  return NextResponse.json({ user }, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const loginId = request.headers.get("current-user-id");

  const body = await request.json();
  const userId = params.userId;

  const user = await client.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  if (user.id !== Number(loginId)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const updatedUser = await client.user.update({
    where: { id: Number(userId) },
    data: body,
  });

  return NextResponse.json({ updatedUser }, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

  const user = await client.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  await client.user.delete({
    where: { id: Number(userId) },
  });
  return new NextResponse(`${userId} User deleted`, { status: 200 });
}
