import { errorMessages } from "@/middleware";
import { Parser } from "htmlparser2";
import { JWTPayload } from "jose";
import jwt from "jsonwebtoken";

export interface GenerateTokenPayload {
  id: number;
  userId: string;
  nickname: string;
  role: string;
  createdAt: Date;
}

export function generateToken(
  payload: GenerateTokenPayload,
  expiresIn: string
) {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn,
  });
  return token;
}

export async function getUserFromTokenPayload(payload: JWTPayload) {
  if (!("id" in payload)) {
    throw new Error(errorMessages.invalidTokenPayload);
  }
  if (!("userId" in payload)) {
    throw new Error(errorMessages.invalidTokenPayload);
  }
  if (!("nickname" in payload)) {
    throw new Error(errorMessages.invalidTokenPayload);
  }
  if (!("role" in payload)) {
    throw new Error(errorMessages.invalidTokenPayload);
  }
  if (!("createdAt" in payload)) {
    throw new Error(errorMessages.invalidTokenPayload);
  }
  if (typeof payload.userId !== "string") {
    throw new Error(errorMessages.invalidTokenPayload);
  }
  if (typeof payload.nickname !== "string") {
    throw new Error(errorMessages.invalidTokenPayload);
  }
  if (typeof payload.role !== "string") {
    throw new Error(errorMessages.invalidTokenPayload);
  }
  if (typeof payload.createdAt !== "string") {
    throw new Error(errorMessages.invalidTokenPayload);
  }
  if (typeof payload.id !== "number") {
    throw new Error(errorMessages.invalidTokenPayload);
  }
  return payload as unknown as GenerateTokenPayload;
}

export const extractMainImg = (content: string): string | null => {
  let mainImg: string | null = null;
  const parser = new Parser({
    onopentag(name, attribs) {
      if (name === "img") {
        mainImg = attribs.src;
        parser.reset();
      }
    },
  });

  parser.write(content);
  parser.end();

  return mainImg;
};
