import { errorMessages } from "@/middleware";
import { JWTPayload, jwtVerify } from "jose";
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
