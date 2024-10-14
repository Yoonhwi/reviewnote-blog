import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authenticator } from "./middlewares/authenticator";
import { reissuer } from "./middlewares/reissure";
import { getUserFromTokenPayload } from "./app/api/utils";
import { PageRoutes } from "./app/constants/routes";

export const errorMessages = {
  noAccessToken: "no access-token",
  emptyRefresh: "empty refresh-token",
  expiredRefresh: "expired refresh-token",
  invalidTokenPayload: "invalid token payload",
};

export async function middleware(request: NextRequest) {
  try {
    // 액세스 토큰 검증
    const payload = await authenticator(request);

    // 검증 통과시, 헤더에 현재 사용자의 ID 추가
    if (payload) {
      const user = await getUserFromTokenPayload(payload);
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("current-user-id", String(user.id));
      const response = NextResponse.next({
        request: { headers: requestHeaders },
      });
      return response;
    }
    // 검증 통과시 다음 미들웨어로 넘어가기
    return NextResponse.next();
  } catch (error) {
    // 액세스 토큰이 없거나 액세스 토큰이 만료된 경우
    if (!(error instanceof Error)) {
      return NextResponse.json({ message: "unknown error" }, { status: 401 });
    }
    if (
      error instanceof Error &&
      (error.message === errorMessages.noAccessToken ||
        error instanceof jwt.TokenExpiredError)
    ) {
      // 액세스 토큰  재발급 시도
      try {
        const { payload, accessToken } = await reissuer(request);
        const user = await getUserFromTokenPayload(payload);
        const requestHeaders = new Headers(request.headers);
        // 헤더에 현재 사용자의 ID 추가
        requestHeaders.set("current-user-id", user.userId);
        // 재발급됐다면, 헤더와 쿠키에 새로운 액세스 토큰 추가
        requestHeaders.set("autorization", accessToken);
        const response = NextResponse.next({
          request: { headers: requestHeaders },
        });
        response.cookies.set("access-token", accessToken);
        return response;
      } catch (error) {
        if (!(error instanceof Error)) {
          return NextResponse.json(
            { message: "unknown error" },
            { status: 401 }
          );
        }
        // 토큰 재발급 실패시 로그인 페이지로 리다이렉트
        console.log("new url", new URL(PageRoutes.Login, request.url));
        return NextResponse.redirect(
          new URL(PageRoutes.Login, request.url),
          302
        );
      }
    }

    // 액세스 토큰이 있고, 만료에러가 아닌 다른 에러인 경우
    console.log("new url", new URL(PageRoutes.Login, request.url));
    return NextResponse.redirect(new URL(PageRoutes.Login, request.url), 302);
  }
}
