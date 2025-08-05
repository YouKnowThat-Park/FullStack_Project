export async function getUser() {
  const res = await fetch("http://localhost:8000/api/users/profile/", {
    method: "Get",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("유저 정보를 불러오지 못했습니다.");
  }

  return res.json();
}
