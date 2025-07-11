import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const backendRes = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
      body: JSON.stringify(body),
    });

    // ✅ 여기에 추가
    const raw = await backendRes.text();
    console.log("[백엔드 응답 텍스트]", raw);

    // JSON으로 다시 파싱 시도 (실패할 수 있음!)
    const data = JSON.parse(raw);

    const accessToken = data.access;
    const refreshToken = data.refresh;

    if (!accessToken || !refreshToken) {
      console.error("[토큰 없음]", data);
      return NextResponse.json(
        { error: "토큰이 응답에 없습니다", data },
        { status: 500 }
      );
    }

    const response = NextResponse.json({ message: "login successful" });

    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
      sameSite: "lax",
      secure: false,
    });

    response.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      secure: false,
    });

    return response;
  } catch (error) {
    console.error("[SIGN-IN ROUTE ERROR]", error);
    return new Response("서버 내부 에러 발생", { status: 500 });
  }
}
