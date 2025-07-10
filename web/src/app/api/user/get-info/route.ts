import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = cookies().get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch("http://localhost:8000/api/users/profile", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
