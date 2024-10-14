import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const page = req.nextUrl.searchParams.get("page") ?? "1";
  const pageSize = 6;
  const startIdx = (Number(page) - 1) * pageSize;

  const userId = params.userId;

  try {
    const user = await client.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const totalPosts = await client.post.count({
      where: { userId: Number(userId) },
    });

    const posts = await client.post.findMany({
      where: { userId: Number(userId) },
      orderBy: {
        id: "desc",
      },
      skip: startIdx,
      take: pageSize,
    });

    const totalPages = Math.ceil(totalPosts / pageSize);

    return NextResponse.json({ posts, totalPages }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
