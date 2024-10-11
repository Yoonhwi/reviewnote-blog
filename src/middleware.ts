import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ApiRoutes } from "./app/constants/routes";
import { match } from "path-to-regexp";

const isProtectedPages = [
  { url: ApiRoutes.Posts, methods: ["POST", "PUT", "DELETE"] },
];

export function middleware(request: NextRequest) {
  // 토큰 검증
  try {
    authenticator(request);
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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
    const token = request.cookies.get("access-token");

    // jwt 검증

    //////////////////////////////////////////

    if (!token?.value) {
      throw new Error("Unauthorized");
    }
  }
}
