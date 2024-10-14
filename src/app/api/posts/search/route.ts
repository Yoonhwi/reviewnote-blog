import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page") ?? "1";
  const search = req.nextUrl.searchParams.get("query") ?? "";
  console.log(page, search);

  if (!search) {
    return NextResponse.json(
      { message: "Search query is required" },
      { status: 400 }
    );
  }

  const pageSize = 8;
  const startIdx = (Number(page) - 1) * pageSize;

  try {
    const totalPosts = await client.post.count({
      where: {
        title: {
          contains: search,
        },
      },
    });

    const posts = await client.post.findMany({
      where: {
        title: {
          contains: search,
        },
      },
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
