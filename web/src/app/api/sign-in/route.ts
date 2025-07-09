import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // 프론트에서 넘어온 요청을 body 파싱
  const body = await req.json();

  const backendRes = await fetch("http://localhost:8000/api/token/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(data, { status: backendRes.status });
  }

  // 로그인 성공시 access, refresh 토큰 추출
  const accessToken = data.access;
  const refreshToken = data.refresh_token;
  const response = NextResponse.json({ message: "login successful" });

  // 서버에서 쿠키스토어 접근
  const cookieStore = cookies();

  // httpOnly, secure, sameSite = strict 옵션으로 쿠키 설정
  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return response;
}
