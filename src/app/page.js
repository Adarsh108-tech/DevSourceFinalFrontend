"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";

export default function Enter() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/protected/pages/home"); // Redirect to /home
    } else {
      router.replace("/getStarted"); // Redirect to /getStarted
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center text-white">
      <Spinner/>
    </div>
  );
}
