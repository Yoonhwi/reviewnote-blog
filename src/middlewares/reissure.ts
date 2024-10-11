import { errorMessages } from "@/middleware";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { NextRequest } from "next/server";

export async function reissuer(request: NextRequest): Promise<{
  payload: JWTPayload;
  accessToken: string;
}> {
  const refreshToken = request.cookies.get("refresh-token");

  if (!refreshToken?.value) {
    throw new Error(errorMessages.emptyRefresh);
  }

  try {
    const { payload } = await jwtVerify(
      new TextEncoder().encode(refreshToken?.value),
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    const newAccessToken = await generateNewAccessToken(payload);
    return { payload, accessToken: newAccessToken };
  } catch (error) {
    throw error;
  }
}

async function generateNewAccessToken(payload: JWTPayload) {
  const newAccessToken = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

  return newAccessToken;
}
