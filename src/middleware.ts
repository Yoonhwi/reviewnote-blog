import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ApiRoutes } from "./app/constants/routes";
import { match } from "path-to-regexp";
import jwt from "jsonwebtoken";

const isProtectedPages = [
  { url: ApiRoutes.Posts, methods: ["POST", "PUT", "DELETE"] },
];

export function middleware(request: NextRequest) {
  // 토큰 검증
  try {
    authenticator(request);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 401 });
  }

  return NextResponse.next();
}

function authenticator(request: NextRequest) {
  const url = new URL(request.url);
  if (
    isProtectedPages.some(
      (page) =>
        match(page.url)(url.pathname) && page.methods.includes(request.method)
    )
  ) {
    console.log("authenticating...");
    const accessToken = request.cookies.get("access-token");
    const refreshToken = request.cookies.get("refresh-token");

    if (!accessToken?.value) {
      throw new Error("empty access-token");
    }

    // jwt 검증
    try {
      const verify = jwt.verify(accessToken.value, process.env.JWT_SECRET!);
    } catch (error) {
      //여기는 accesstoken이 존재하지만, 만료 됬을때, refresh token을 토대로 새로운 access token을 발급해주는 로직
      //refresh token이 존재하지 않을때
      //둘다 재발급 해야되기떄문에 다시 로그인 해야함.
      throw new Error("expired access-token");
    }
  }
}
