"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/getStarted"); // Redirect to login/signup
    } else {
      setLoading(false); // Allow access
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Checking Auth...
      </div>
    );
  }

  return children;
}
