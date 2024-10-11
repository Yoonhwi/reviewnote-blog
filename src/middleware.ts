import { jwtVerify, SignJWT } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { match } from "path-to-regexp";
import { ApiRoutes, PageRoutes } from "./app/constants/routes";

const isProtectedPages = [
  { url: ApiRoutes.Posts, methods: ["POST", "PUT", "DELETE"] },
  { url: ApiRoutes.Me, methods: ["GET"] },
];

const errorMessages = {
  emptyRefresh: "empty refresh-token",
  expiredRefresh: "expired refresh-token",
};

export function middleware(request: NextRequest) {
  try {
    const response = authenticator(request);
    if (response) {
      return response;
    }
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === errorMessages.emptyRefresh ||
        error.message === errorMessages.expiredRefresh
      ) {
        const loginUrl = new URL(PageRoutes.Login, request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
    return NextResponse.json({ message: error }, { status: 401 });
  }

  return NextResponse.next();
}

async function authenticator(request: NextRequest) {
  const url = new URL(request.url);
  if (
    isProtectedPages.some(
      (page) =>
        match(page.url)(url.pathname) && page.methods.includes(request.method)
    )
  ) {
    console.log("protected page");
    const accessToken = request.cookies.get("access-token");
    const refreshToken = request.cookies.get("refresh-token");

    if (!accessToken?.value) {
      // refreshToken이 있는지 확인
      if (!refreshToken?.value) {
        throw new Error(errorMessages.emptyRefresh);
      }

      // refreshToken 검증
      try {
        const newAccessToken = await generateAccessToken(refreshToken.value);
        const response = NextResponse.next();
        response.cookies.set("access-token", newAccessToken);
        return response;
      } catch (error) {
        throw new Error(errorMessages.expiredRefresh);
      }
    } else {
      // accessToken이 있는 경우 검증
      try {
        await jwtVerify(
          new TextEncoder().encode(accessToken.value),
          new TextEncoder().encode(process.env.JWT_SECRET!)
        );
      } catch (error) {
        if (!refreshToken?.value) {
          throw new Error(errorMessages.emptyRefresh);
        }
        // refreshToken 검증
        try {
          const newAccessToken = await generateAccessToken(refreshToken.value);
          const response = NextResponse.next();
          response.cookies.set("access-token", newAccessToken);
          return response;
        } catch (error) {
          throw new Error(errorMessages.expiredRefresh);
        }
      }
    }
  }
}

async function generateAccessToken(refreshToken: string) {
  const { payload: user } = await jwtVerify(
    new TextEncoder().encode(refreshToken),
    new TextEncoder().encode(process.env.JWT_SECRET!)
  );

  const newAccessToken = await new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

  return newAccessToken;
}
