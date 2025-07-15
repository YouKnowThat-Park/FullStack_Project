export const handleLogout = async () => {
  try {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("로그 아웃 실패:", error);
  }
};
