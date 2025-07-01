"use client";
import Link from "next/link";
export default function GetStarted() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-200 animate-pulse blur-2xl opacity-50 z-0" />
      {/* Content Layer */}
      <div className="relative z-10 flex items-center justify-between h-full px-10">
        {/* Left side: Buttons */}
        <div className="space-x-4">
          <Link href="/login">
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-full shadow-md hover:bg-indigo-100 transition">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-indigo-700 transition">
              Signup
            </button>
          </Link>
        </div>
        {/* Right side: Company Name */}
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          DevSource
        </h1>
      </div>
    </div>
  );
}