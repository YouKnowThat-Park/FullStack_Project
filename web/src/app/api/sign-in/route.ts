import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

  const accessToken = data.access;
  const refreshToken = data.refresh_token;
  const response = NextResponse.json({ message: "login successful" });

  const cookieStore = cookies();

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
