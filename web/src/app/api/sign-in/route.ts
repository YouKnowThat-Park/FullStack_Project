import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const backendRes = await fetch("http://localhost:8000/api/token/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return new Response(JSON.stringify(data), {
      status: backendRes.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const accessToken = data.access;
  const refreshToken = data.refresh_token;

  if (!accessToken || !refreshToken) {
    return new Response(
      JSON.stringify({ error: "토큰이 응답에 없습니다", data }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const response = new Response(
    JSON.stringify({ message: "login successful" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": [
          `access_token=${accessToken}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict; Secure`,
          `refresh_token=${refreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict; Secure`,
        ].join(", "),
      },
    }
  );

  return response;
}
