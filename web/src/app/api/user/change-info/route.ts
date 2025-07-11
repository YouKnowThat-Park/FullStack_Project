import { NextRequest, NextResponse } from "next/server";

// PATCH를 사용한 이유는 일부 필드만 수정할꺼라서
// PUT은 전체 필드를 덮어쓰기 때문에 내정보 수정에서 불필요

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const accessToken = req.cookies.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const backendRes = await fetch("http://localhost:8000/api/users/change/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(data, { status: backendRes.status });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
