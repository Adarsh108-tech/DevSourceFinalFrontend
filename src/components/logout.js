"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); // 🔐 Clear the JWT token
    router.push("/login"); // ⏩ Redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all"
    >
      Logout
    </button>
  );
}
