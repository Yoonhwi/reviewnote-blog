import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function GET(req: NextApiRequest) {
  try {
    const users = await client.user.findMany();
    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await client.user.create({
      data: body,
    });
    return NextResponse.json({ message: "user created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to create user", error: err },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextApiRequest) {
  try {
    const { id } = req.query;
    await client.user.update({
      where: { id: Number(id) },
      data: req.body,
    });
    return NextResponse.json({ message: "user updated" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to update user", error: err },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextApiRequest) {
  try {
    const { id } = req.query;
    await client.user.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "user deleted" }, { status: 204 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to delete user", error: err },
      { status: 500 }
    );
  }
}
