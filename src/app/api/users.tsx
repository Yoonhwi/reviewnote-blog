import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req);
  if (req.method === "POST") {
    console.log(req.body);
    const { name, userId, password } = req.body;
    try {
      await client.user.create({
        data: {
          name,
          password,
          userId,
        },
      });
      res.status(201).json({ message: "post success" });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
  }
}
