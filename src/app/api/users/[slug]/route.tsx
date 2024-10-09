import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const client = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const user = await client.user.findUnique({
    where: { id: Number(slug) },
  });
  return NextResponse.json({ user }, { status: 200 });
}
