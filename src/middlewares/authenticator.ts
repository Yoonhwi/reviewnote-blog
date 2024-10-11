import { ApiRoutes } from "@/app/constants/routes";
import { errorMessages } from "@/middleware";
import { jwtVerify } from "jose";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";
import { match } from "path-to-regexp";

const isProtectedPages = [
  { url: ApiRoutes.Posts, methods: ["POST"] },
  { url: ApiRoutes.Post, methods: ["PUT", "DELETE"] },
  { url: ApiRoutes.Me, methods: ["GET"] },
  { url: ApiRoutes.Comments, methods: ["POST"] },
  { url: ApiRoutes.Comment, methods: ["PUT", "DELETE"] },
];

export async function authenticator(
  request: NextRequest
): Promise<JwtPayload | undefined> {
  const url = new URL(request.url);

  // 보호되지 않은 api 요청은 무시 (pathname과 method이 일치하는지 확인)
  if (
    !isProtectedPages.some((page) => {
      return (
        match(page.url)(url.pathname) && page.methods.includes(request.method)
      );
    })
  ) {
    return;
  }

  const accessToken = request.cookies.get("access-token");

  // 액세스 토큰이 없는 경우 에러
  if (!accessToken?.value) {
    throw new Error(errorMessages.noAccessToken);
  }

  // 액세스 토큰 검증
  try {
    const { payload } = await jwtVerify(
      new TextEncoder().encode(accessToken.value),
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    return payload;
  } catch (error) {
    throw error;
  }
}
