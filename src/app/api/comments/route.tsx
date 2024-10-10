import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function GET(req: NextApiRequest) {
  try {
    const comments = await client.comment.findMany();
    return NextResponse.json({ comments }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await client.comment.create({
      data: body,
    });
    return NextResponse.json({ message: "comment created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to create comment", error: err },
      { status: 500 }
    );
  }
}
