import { NextRequest, NextResponse } from "next/server";

// 로그인 상태에서 막을 경로
const guestOnlyRoutes = ["/sign-in", "/sign-up"];

// 로그인 해야 접근 가능한 경로
const protectedRoutes = ["/mypage"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("access_token");

  // 로그인된 상태에서 sign-in / sign-up 들어오면 → 홈으로 리다이렉트
  if (
    accessToken &&
    guestOnlyRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  //  로그인 안된 상태에서 보호 경로 접근 시 → sign-in 리다이렉트
  if (
    !accessToken &&
    protectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

// ✅ 미들웨어 적용할 경로
export const config = {
  matcher: ["/sign-in", "/sign-up", "/mypage/:path*"],
};
